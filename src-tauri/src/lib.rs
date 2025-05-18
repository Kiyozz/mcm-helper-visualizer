// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use log::{debug, error, info, log};
use std::collections::HashMap;
use std::fs;
use std::path::Path;
use std::time::SystemTime;
use tauri::path::PathResolver;
use tauri::{AppHandle, Manager, Wry};
use tauri_plugin_opener::OpenerExt;
use utf16string::WString;

#[tauri::command]
fn read_file(path: &str) -> Option<String> {
    let contents = fs::read_to_string(path);

    debug!("Reading file: \"{}\"", path);

    match contents {
        Ok(contents) => Some(contents),
        Err(err) => {
            println!("{:?}", err);
            error!("Failed to read file: {:?}", err);

            None
        }
    }
}

#[tauri::command]
fn read_translations(path: &str) -> Option<HashMap<String, String>> {
    let contents = fs::read(path);

    info!("Reading translations: \"{}\"", path);

    match contents {
        Ok(contents) => {
            let decoded = WString::from_utf16le(contents);

            if let Err(err) = decoded {
                error!("The translations file is not encoded in UTF-16 LE");
                error!("Failed to decode translations: {}", err);
            }

            let decoded = decoded.expect("translations is in wrong format");

            let utf8 = decoded.to_utf8();
            let utf8 = utf8.trim_start_matches('\u{feff}').to_string(); // Remove BOM

            let mut map = HashMap::new();

            for line in utf8.lines() {
                let line = line.trim(); // Trim any extra whitespace

                if line.is_empty() {
                    continue;
                }

                let parts: Vec<&str> = line.splitn(2, |c| c == ' ' || c == '\t').collect();

                if parts.len() == 2 {
                    map.insert(parts[0].to_string(), parts[1].to_string());
                }
            }

            Some(map)
        }
        Err(err) => {
            print!("{:?}", err);

            None
        }
    }
}

#[tauri::command]
fn path_exists(path: &str) -> bool {
    Path::new(path).exists()
}

#[tauri::command]
fn open_log_dir(app_handle: AppHandle) -> Result<(), tauri_plugin_opener::Error> {
    let log_dir = app_handle.path().app_log_dir()?;

    app_handle
        .opener()
        .open_path(log_dir.to_str().unwrap(), None::<String>)
}

#[tauri::command]
fn log_text(text: &str, level: Option<&str>) {
    let level = match level {
        Some(level) => match level {
            "error" => log::Level::Error,
            "warn" => log::Level::Warn,
            "info" => log::Level::Info,
            "debug" => log::Level::Debug,
            "trace" => log::Level::Trace,
            _ => log::Level::Info,
        },
        None => log::Level::Info,
    };

    log!(level, "{}", text);
}

fn setup_logger(path_resolver: &PathResolver<Wry>) -> Result<(), fern::InitError> {
    let log_dir = path_resolver.app_log_dir().expect("cannot get log dir");
    let log_file = log_dir.join("app.log");

    fs::create_dir_all(&log_dir).expect("cannot create log dir");

    if log_file.exists() {
        fs::write(&log_file, "").expect("cannot clear log file");
    }

    fs::File::create(&log_file).expect("cannot create log file");

    fern::Dispatch::new()
        .format(|out, message, record| {
            out.finish(format_args!(
                "{}[{}][{}] {}",
                humantime::format_rfc3339_seconds(SystemTime::now()),
                record.level(),
                record.target(),
                message
            ))
        })
        .level(log::LevelFilter::Debug)
        .chain(std::io::stdout())
        .chain(fern::log_file(log_file)?)
        .apply()?;

    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_clipboard_manager::init())
        .setup(|app| {
            setup_logger(app.path()).expect("failed to setup logger");

            info!("Application setup");

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            read_file,
            read_translations,
            path_exists,
            log_text,
            open_log_dir
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

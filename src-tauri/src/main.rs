// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::collections::HashMap;
use std::fs;
use utf16string::{WString};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn read_file(path: &str) -> Option<String> {
    let contents = fs::read_to_string(path);

    match contents {
        Ok(contents) => Some(contents),
        Err(err) => {
            println!("{:?}", err);

            None
        }
    }
}

#[tauri::command]
fn read_translations(path: &str) -> Option<HashMap<String, String>> {
    let contents = fs::read(path);

    match contents {
        Ok(contents) => {
            let decoded = WString::from_utf16le(contents).expect("translations is in wrong format");

            let utf8 = decoded.to_utf8();
            let utf8 = utf8.trim_start_matches('\u{feff}').to_string(); // Remove BOM

            println!("{}", utf8);

            /*
                text is like this:

                $Text Value
                $Text2 Value2
                // maybe empty line, can be seperator \r\n or \t
                $Text3 Value3
            */

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
        },
        Err(err) => {
            print!("{:?}", err);

            None
        }
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![read_file, read_translations])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

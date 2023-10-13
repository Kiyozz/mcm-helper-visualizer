import { z } from 'zod'

const SourceFormSchema = z.string().regex(/^[^\\/:*?"<>|]+\.es[lmp]\|(0[Xx])?[\dA-Fa-f]{1,8}$/)

const GroupBehaviorSchema = z.union([z.literal('disable'), z.literal('hide'), z.literal('skip')]).default('disable')

type GroupCondition =
  | number
  | GroupCondition[]
  | {
      OR?: GroupCondition
      AND?: GroupCondition
      ONLY?: GroupCondition
      NOT?: GroupCondition
    }

const GroupConditionSchema: z.ZodType<GroupCondition> = z.union([
  z.number().int().min(1),
  z.array(z.lazy(() => GroupConditionSchema)),
  z
    .object({
      OR: z.lazy(() => GroupConditionSchema),
      AND: z.lazy(() => GroupConditionSchema),
      ONLY: z.lazy(() => GroupConditionSchema),
      NOT: z.lazy(() => GroupConditionSchema),
    })
    .partial()
    .strict()
    .refine((val) => {
      // at least one key must be present
      return Object.keys(val).length > 0
    }, 'At least one key must be present'),
])

const CursorFileModeSchema = z.enum(['topToBottom', 'leftToRight']).default('leftToRight')

const TextControlActionSchema = z.union([
  z.object({
    type: z.literal('CallFunction'),
    form: z.string(),
    function: z.string(),
    params: z.array(z.union([z.string(), z.number(), z.boolean()])),
    sourceForm: SourceFormSchema.optional(),
    scriptName: z.string().optional(),
  }),
  z.object({
    type: z.literal('CallGlobalFunction'),
    script: z.string(),
    function: z.string(),
    params: z.array(z.union([z.string(), z.number(), z.boolean()])).optional(),
  }),
])

const CustomContentSchema = z
  .object({
    source: z.string().optional(),
    x: z.number().max(770).default(0),
    y: z.number().max(446).default(0),
  })
  .strict()

/*const KeyBindControlActionSchema = z.union([
  TextControlActionSchema,
  z.object({
    type: z.literal("RunConsoleCommand"),
    command: z.string()
  }),
  z.object({
    type: z.literal("SendEvent"),
    form: z.string(),
    scriptName: z.string()
  }),
])*/

const TextSourceSchema = z
  .object({
    sourceType: z.string().optional().describe('deprecated'),
    sourceForm: SourceFormSchema.optional(),
    scriptName: z.string().optional(),
    propertyName: z.string().optional(),
    defaultValue: z.string().optional(),
  })
  .optional()

const SourceSchema = z
  .intersection(
    z.union([
      z.object({
        sourceType: z.union([z.literal('GlobalValue'), z.literal('ModSettingBool'), z.literal('ModSettingFloat'), z.literal('ModSettingInt')]),
      }),
      z.object({
        sourceType: z.union([z.literal('PropertyValueInt'), z.literal('PropertyValueFloat'), z.literal('PropertyValueBool')]),
        scriptName: z.string().optional(),
        propertyName: z.string(),
      }),
      z.object({
        sourceType: z.union([z.literal('PropertyValueString'), z.literal('ModSettingString')]),
        propertyName: z.string(),
      }),
    ]),
    z.object({
      defaultValue: z.union([z.number(), z.boolean()]).optional(),
      sourceForm: SourceFormSchema.optional(),
    }),
  )
  .optional()

/*

For reference only,
zod doesn't support z.intersection in discriminated unions, so, we skip id and valueOptions for keymap controls

const zKeymapControl = z.intersection(
  z.object({
    type: z.literal("keymap"),
    text: z.string(),
    help: z.string().optional(),
    ignoreConflicts: z.boolean().default(false),
  }),
  z.union([
    z.object({
      id: z.string(),
    }),
    z.object({
      valueOptions: zMcmHelperSource
    })
  ])
)*/

const ControlSchema = z
  .discriminatedUnion('type', [
    z.object({
      type: z.literal('empty'),
    }),
    z.object({
      type: z.literal('header'),
      text: z.string(),
    }),
    z.object({
      type: z.literal('text'),
      text: z.string(),
      help: z.string().optional(),
      action: TextControlActionSchema.optional(),
      valueOptions: z
        .object({
          value: z.string(),
        })
        .and(TextSourceSchema)
        .optional(),
    }),
    z.object({
      type: z.literal('toggle'),
      text: z.string(),
      help: z.string().optional(),
      groupControl: z.number().min(1).optional(),
      valueOptions: SourceSchema,
    }),
    z.object({
      type: z.literal('hiddenToggle'),
      text: z.string().optional(),
      groupControl: z.number().min(1).optional(),
      valueOptions: SourceSchema,
    }),
    z.object({
      type: z.literal('slider'),
      text: z.string(),
      help: z.string().optional(),
      valueOptions: z
        .object({
          min: z.number(),
          max: z.number(),
          step: z.number(),
          formatString: z.string().optional(),
        })
        .and(SourceSchema),
    }),
    z.object({
      type: z.literal('stepper'),
      text: z.string(),
      help: z.string().optional(),
      valueOptions: z
        .object({
          options: z.array(z.string()),
        })
        .and(SourceSchema),
    }),
    z.object({
      type: z.literal('menu'),
      text: z.string(),
      help: z.string().optional(),
      valueOptions: z
        .object({
          options: z.array(z.string()),
          shortNames: z.array(z.string()).optional(),
        })
        .and(TextSourceSchema),
    }),
    z.object({
      type: z.literal('enum'),
      text: z.string(),
      help: z.string().optional(),
      valueOptions: z
        .object({
          options: z.array(z.string()),
          shortNames: z.array(z.string()).optional(),
        })
        .and(SourceSchema),
    }),
    z.object({
      type: z.literal('color'),
      text: z.string(),
      valueOptions: SourceSchema,
    }),
    z.object({
      type: z.literal('keymap'),
      text: z.string(),
      help: z.string().optional(),
      ignoreConflicts: z.boolean().default(false),
      valueOptions: SourceSchema,
    }),
    z.object({
      type: z.literal('input'),
      text: z.string(),
    }),
  ])
  .and(
    z.object({
      groupBehavior: GroupBehaviorSchema,
      groupCondition: GroupConditionSchema.optional(),
    }),
  )

const KeyBindSchema = z.object({
  id: z.string(),
  desc: z.string(),
  action: TextControlActionSchema,
})

const PageSchema = z.intersection(
  z.object({
    pageDisplayName: z.string(),
    cursorFillMode: CursorFileModeSchema,
  }),
  z.union([
    z.object({
      content: z.array(ControlSchema),
    }),
    z.object({
      customContent: CustomContentSchema,
    }),
  ]),
)

export const McmHelperConfigSchema = z
  .object({
    $schema: z.string().optional(),
    displayName: z.string(),
    minMcmVersion: z.number().optional(),
    pluginRequirements: z.array(z.string()).optional(),
    cursorFillMode: CursorFileModeSchema,
    content: z.array(ControlSchema).optional(),
    customContentData: CustomContentSchema.optional(),
    pages: z.array(PageSchema).optional(),
    keybinds: z.array(KeyBindSchema).optional(),
  })
  .refine(
    (config) => {
      if (!('pages' in config) && !('content' in config)) {
        return false
      }

      return !('pages' in config && 'content' in config)
    },
    () => {
      return { message: `You must either use "content" or "pages.content"` }
    },
  )

export type McmHelperConfig = z.infer<typeof McmHelperConfigSchema>

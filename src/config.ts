import { z } from 'zod'

const SourceFormSchema = z.string().regex(/^[^\\/:*?"<>|]+\.es[lmp]\|(0[Xx])?[\dA-Fa-f]{1,8}$/)

const GroupBehaviorSchema = z.union([z.literal('disable'), z.literal('hide'), z.literal('skip')]).optional()

export type GroupBehavior = z.infer<typeof GroupBehaviorSchema>

export type GroupCondition =
  | number
  | GroupCondition[]
  | {
      OR?: GroupCondition
      AND?: GroupCondition
      ONLY?: number[]
      NOT?: GroupCondition
    }

const GroupConditionSchema: z.ZodType<GroupCondition> = z.union([
  z.number().int().min(1),
  z.array(z.lazy(() => GroupConditionSchema)),
  z
    .object({
      OR: z.lazy(() => GroupConditionSchema),
      AND: z.lazy(() => GroupConditionSchema),
      ONLY: z.array(z.number().int().min(1)),
      NOT: z.lazy(() => GroupConditionSchema),
    })
    .partial()
    .strict()
    .refine((val) => {
      // at least one key must be present
      return Object.keys(val).length > 0
    }, 'At least one key must be present'),
])

const BaseControlSchema = z.object({
  groupBehavior: GroupBehaviorSchema,
  groupCondition: GroupConditionSchema.optional(),
  position: z.number().int().min(0).default(0),
})

const CursorFileModeSchema = z.enum(['topToBottom', 'leftToRight']).default('leftToRight')

const TextControlActionSchema = z.union([
  z.object({
    type: z.literal('CallFunction'),
    form: z.string().optional(),
    function: z.string(),
    params: z.array(z.union([z.string(), z.number(), z.boolean()])).optional(),
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

export type McmHelperCustomContent = z.infer<typeof CustomContentSchema>

const TextSourceSchema = z
  .object({
    sourceType: z.string().optional().describe('deprecated'),
    sourceForm: SourceFormSchema.optional(),
    scriptName: z.string().optional(),
    propertyName: z.string().optional(),
    defaultValue: z.string().optional(),
  })
  .optional()

const SourceTypeSchema = z.object({
  sourceType: z
    .union([
      z.literal('GlobalValue'),
      z.literal('ModSettingBool'),
      z.literal('ModSettingFloat'),
      z.literal('ModSettingInt'),
    ])
    .optional(),
})

const SourceTypeScriptNameSchema = z.object({
  sourceType: z.union([z.literal('PropertyValueInt'), z.literal('PropertyValueFloat'), z.literal('PropertyValueBool')]),
  scriptName: z.string().optional(),
  propertyName: z.string(),
})

const SourceTypePropertyNameSchema = z.object({
  sourceType: z.union([z.literal('PropertyValueString'), z.literal('ModSettingString')]),
  propertyName: z.string(),
})

const SourceSchema = z
  .intersection(
    z.union([SourceTypeSchema, SourceTypeScriptNameSchema, SourceTypePropertyNameSchema]),
    z.object({
      defaultValue: z.union([z.number(), z.boolean()]).optional(),
      sourceForm: SourceFormSchema.optional(),
    }),
  )
  .optional()

const HeaderSchema = z.object({
  type: z.literal('header'),
  text: z.string().default(''),
  help: z.string().optional(),
})

export type McmHelperHeader = z.infer<typeof HeaderSchema> & z.infer<typeof BaseControlSchema>

const ToggleSchema = z.object({
  type: z.literal('toggle'),
  text: z.string(),
  help: z.string().optional(),
  groupControl: z.number().min(1).optional(),
  valueOptions: SourceSchema,
})

export type McmHelperToggle = z.infer<typeof ToggleSchema> & z.infer<typeof BaseControlSchema>

const TextSchema = z.object({
  type: z.literal('text'),
  text: z.string(),
  help: z.string().optional(),
  action: TextControlActionSchema.optional(),
  valueOptions: z
    .object({
      value: z.string().optional(),
    })
    .and(TextSourceSchema)
    .optional(),
})

export type McmHelperText = z.infer<typeof TextSchema> & z.infer<typeof BaseControlSchema>

const SliderSchema = z.object({
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
})

export type McmHelperSlider = z.infer<typeof SliderSchema> & z.infer<typeof BaseControlSchema>

const EnumSchema = z.object({
  type: z.literal('enum'),
  text: z.string(),
  help: z.string().optional(),
  valueOptions: z
    .object({
      options: z.array(z.string()),
      shortNames: z.array(z.string()).optional(),
    })
    .and(SourceSchema),
})

export type McmHelperEnum = z.infer<typeof EnumSchema> & z.infer<typeof BaseControlSchema>

const HiddenToggleSchema = z.object({
  type: z.literal('hiddenToggle'),
  text: z.string().optional(),
  groupControl: z.number().min(1).optional(),
  valueOptions: SourceSchema,
})

export type McmHelperHiddenToggle = z.infer<typeof HiddenToggleSchema> & z.infer<typeof BaseControlSchema>

const StepperSchema = z.object({
  type: z.literal('stepper'),
  text: z.string(),
  help: z.string().optional(),
  valueOptions: z
    .object({
      options: z.array(z.string()),
    })
    .and(SourceSchema),
})

export type McmHelperStepper = z.infer<typeof StepperSchema> & z.infer<typeof BaseControlSchema>

const MenuSchema = z.object({
  type: z.literal('menu'),
  text: z.string(),
  help: z.string().optional(),
  valueOptions: z
    .object({
      options: z.array(z.string()),
      shortNames: z.array(z.string()).optional(),
    })
    .and(TextSourceSchema),
})

export type McmHelperMenu = z.infer<typeof MenuSchema> & z.infer<typeof BaseControlSchema>

const ColorSchema = z.object({
  type: z.literal('color'),
  text: z.string(),
  help: z.string().optional(),
  valueOptions: SourceSchema,
})

export type McmHelperColor = z.infer<typeof ColorSchema> & z.infer<typeof BaseControlSchema>

const KeymapSchema = z.object({
  type: z.literal('keymap'),
  text: z.string(),
  help: z.string().optional(),
  ignoreConflicts: z.boolean().default(false),
  valueOptions: SourceSchema,
})

export type McmHelperKeymap = z.infer<typeof KeymapSchema> & z.infer<typeof BaseControlSchema>

const InputSchema = z.object({
  type: z.literal('input'),
  text: z.string(),
  help: z.string().optional(),
  valueOptions: TextSourceSchema,
})

export type McmHelperInput = z.infer<typeof InputSchema> & z.infer<typeof BaseControlSchema>

const EmptySchema = z.object({
  type: z.literal('empty'),
})

export type McmHelperEmpty = z.infer<typeof EmptySchema> & z.infer<typeof BaseControlSchema>

const ControlSchema = z
  .discriminatedUnion('type', [
    EmptySchema,
    HeaderSchema,
    TextSchema,
    ToggleSchema,
    HiddenToggleSchema,
    SliderSchema,
    StepperSchema,
    MenuSchema,
    EnumSchema,
    ColorSchema,
    KeymapSchema,
    InputSchema,
  ])
  .and(BaseControlSchema)

export type McmHelperControl = z.infer<typeof ControlSchema>

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

export type McmHelperPage = z.infer<typeof PageSchema>

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
  .superRefine((val) => {
    const hasPageWithSameName = val.pages?.some((page, index) => {
      return val.pages?.some((page2, index2) => {
        return index !== index2 && page.pageDisplayName === page2.pageDisplayName
      })
    })

    if (hasPageWithSameName) {
      return {
        message: 'Page names must be unique',
        path: ['pages'],
      }
    }

    return true
  })

export type McmPage = z.infer<typeof PageSchema>

export type McmHelperConfig = z.infer<typeof McmHelperConfigSchema>

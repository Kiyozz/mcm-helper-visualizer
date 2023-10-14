/**
 * Extract the color from a text <font color="theColor">Text</font>
 * @param text
 */
export function getHexColorFromText(text: string): string | undefined {
  const color = text.match(/<font color=["'](.*)["']>/)

  if (color && color.length > 1) {
    return color[1]
  }
}

export function removeColorTagFromText(text: string): string {
  return text.replace(/<font color=["'](.*)["']>/, '').replace('</font>', '')
}

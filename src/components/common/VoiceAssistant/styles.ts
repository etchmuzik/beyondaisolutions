export const styles = {
  container: 'fixed bottom-4 right-4 z-50 flex flex-col items-end',
  
  // Toggle Button
  toggleButton: `
    flex items-center gap-2 px-4 py-3
    bg-primary hover:bg-primary/90
    rounded-full text-black font-medium
    shadow-lg hover:shadow-xl
    transform hover:-translate-y-0.5
    transition-all duration-300 ease-in-out
  `,
  toggleButtonActive: 'bg-primary/90 shadow-xl -translate-y-0.5',
  icon: 'h-5 w-5',
  label: 'text-sm',

  // Widget
  widgetContainer: `
    fixed bottom-20 right-4
    w-[350px]
    transition-all duration-300 ease-in-out
    transform origin-bottom-right
  `,
  widgetWrapper: `
    bg-background
    rounded-lg overflow-hidden
    border border-border
    shadow-2xl
  `,
  widget: `
    w-full h-[600px]
    voice-assistant-widget
  `,
  widgetOpen: 'scale-100 opacity-100',
  widgetClosed: 'scale-0 opacity-0 pointer-events-none'
} as const;
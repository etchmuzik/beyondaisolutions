export const styles = {
  button: `
    fixed bottom-4 left-4 z-50
    flex items-center gap-2
    bg-[#25D366] hover:bg-[#22c55e]
    text-white font-medium
    px-4 py-3 rounded-full
    shadow-lg hover:shadow-xl
    transform hover:-translate-y-0.5
    transition-all duration-300 ease-in-out
  `,
  icon: 'h-5 w-5',
  label: 'text-sm'
} as const;
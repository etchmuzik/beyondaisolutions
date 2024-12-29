export const authLayoutStyles = {
  wrapper: 'min-h-screen bg-background flex',
  formContainer: 'flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 xl:px-20',
  formWrapper: 'max-w-sm mx-auto w-full',
  imageContainer: 'hidden lg:block flex-1 relative',
  image: 'absolute inset-0 w-full h-full object-cover brightness-[0.7] grayscale',
  imageOverlay: 'absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/10'
} as const;
function customLog(...messages: any[]) {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production') {
    console.log(...messages);
  }
}

export { customLog };

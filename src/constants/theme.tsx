export const getColors = (mode: 'light' | 'dark') => ({
    primary: mode === 'dark' ? '#37500F' : '#6478FF',     // Vibrant green
    secondary: mode === 'dark' ? '#C8F05B' : '#C8F05B',  // Deeper green
    background: mode === 'dark' ? '#F0F0F0' : '#F0F0F0', // Dark: greenish black; Light: mint background
    accent: mode === 'dark' ? '#86EFAC' : '#22C55E',     // Light green accent
    highlight: mode === 'dark' ? '#14532D' : '#BBF7D0',  // Dark: forest green; Light: soft green
    textLight: mode === 'dark' ? '#C4DDDE' : '#3D6176',  // Light text for dark bg and vice versa
    textDark: mode === 'dark' ? '#D1FAE5' : '#052E16',   // Darker text for readability
    track: mode === 'dark' ? '#4C644C' : '#C1EFC5',      // Slider track muted green
    thumb: mode === 'dark' ? '#15803D' : '#065F46',      // Slider thumb green shades
});

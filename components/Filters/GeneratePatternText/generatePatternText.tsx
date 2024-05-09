export default function generatePatternText(): string {
    const randomChars = 'abcdefghijklmnopqrstuvwxyz'; // Characters to use for random parts
    const randomCharsLength = randomChars.length;
    let patternText = '';

    // Generate the first part (4 characters)
    for (let i = 0; i < 4; i++) {
        const randomCharIndex = Math.floor(Math.random() * randomCharsLength);
        patternText += randomChars[randomCharIndex];
    }

    // Add the hyphen
    patternText += '-';

    // Generate the second part (3 characters)
    for (let i = 0; i < 3; i++) {
        const randomCharIndex = Math.floor(Math.random() * randomCharsLength);
        patternText += randomChars[randomCharIndex];
    }
    // Add another hyphen
    patternText += '-';

    // Generate the third part (3 characters)
    for (let i = 0; i < 3; i++) {
        const randomCharIndex = Math.floor(Math.random() * randomCharsLength);
        patternText += randomChars[randomCharIndex];
    }
    return patternText;
}
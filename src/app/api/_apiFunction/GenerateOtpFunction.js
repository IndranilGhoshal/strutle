
export default function generateOtp({len, nums}) {
    const numChars = "0123456789";
    let pass = "";
    for (let i = 0; i < len; i++) {
        const randIdx = Math.floor(Math.random() * numChars.length);
        pass += numChars[randIdx];
    }

    return pass;
}
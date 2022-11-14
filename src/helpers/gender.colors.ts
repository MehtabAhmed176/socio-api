export const maleColors = ["#404258", "#474E68", "#6B728E", "#EAEAEA", "#3C4048", "#D8D9CF"]
export const femaleColors = ["#FFB9B9", "#FFDDD2", "#FFACC7", "#FF8DC7"]
export const otherColors = ["#CDFCF6", , "#474E68", "#6B728E", "#FFACC7", "#FF8DC7"] // have team decision on this

export default function (gender: string) {
    const randomMaleColor = Math.floor(Math.random() * maleColors.length);
    const randomFemaleColor = Math.floor(Math.random() * femaleColors.length);
    const randomOtherColor = Math.floor(Math.random() * otherColors.length);
    if (gender === 'male') return maleColors[randomMaleColor]
    else if (gender === 'female') return femaleColors[randomFemaleColor]
    else return otherColors[randomOtherColor]
}
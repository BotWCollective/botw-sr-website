type Props = {
    Name: string,
    ColorTo: string,
    ColorFrom: string,
    Nationality?: string
}
export default function UserName({Name, ColorTo, ColorFrom, Nationality}: Props) {
    const css: React.CSSProperties = {
        backgroundImage: `-webkit-linear-gradient(right, ${[ColorFrom, ColorTo].join(",")})`, 
        display: 'inline',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 'bolder'
}
    return (<div style={{display: 'inline'}}><img src={`https://flagcdn.com/256x192/${Nationality}.png`} style={{display: 'inline', height: '0.8em', verticalAlign: '-.1em' }}/>&nbsp;<span style={css}>{Name}</span></div>)
}
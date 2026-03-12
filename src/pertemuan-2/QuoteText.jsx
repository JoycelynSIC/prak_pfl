export default function QuoteText() {
    const text = "Mulutmu Harimaumu🦁";
    const text2 = "Aku ingin jadi macan";
    return (
        <div className="card">
            <p>{text.toLowerCase()}</p>
            <p>{text2.toUpperCase()}</p>
        </div>
    )
}

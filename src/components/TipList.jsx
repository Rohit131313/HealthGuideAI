import TipCard from "./TipCard";

export default function TipList({ tips }) {
    return (
        <div className="mt-6 grid gap-5">
            {tips.map((tip, index) => (
                <TipCard key={tip.id} tip={tip} index={index} />
            ))}
        </div>
    );
}

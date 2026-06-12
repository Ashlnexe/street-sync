import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Delta, DeltaIcon, DeltaValue } from "@/components/delta";

export function DashboardStats({ stats = [] }) {
	return (
        <>
            {stats.map((s) => (
				<StatCard key={s.label} stat={s} />
			))}
        </>
    );
}

function StatCard({
    stat
}) {
	const { label, value, delta, hint } = stat;
	return (
        <Card>
            <CardHeader>
				<CardTitle className="font-normal text-muted-foreground text-xs">
					{label}
				</CardTitle>
			</CardHeader>
            <CardContent>
				<p
                    className="text-balance font-semibold text-2xl tabular-nums tracking-tight">
					{value}
				</p>
			</CardContent>
            <CardFooter className="gap-1.5 text-xs">
				<Delta value={delta} variant="default">
					<DeltaIcon />
					<DeltaValue />
				</Delta>
				<span className="text-pretty text-muted-foreground">{hint}</span>
			</CardFooter>
        </Card>
    );
}

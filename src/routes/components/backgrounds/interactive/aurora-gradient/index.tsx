import { createFileRoute } from "@tanstack/react-router";
import { MainLayout } from "@/main-layout";

export const Route = createFileRoute(
    "/components/backgrounds/interactive/aurora-gradient/"
)({
    component: AuroraPage,
});

function AuroraPage() {
    return (
        <MainLayout>
            <div>Aurora Gradient</div>
        </MainLayout>
    );
}

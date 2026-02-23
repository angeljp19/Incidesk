import { PanelMensajeria } from "../../components/mensajeria/panelMensajeria";
import { PageHeader } from "../../components/pageHeader";

export function MensajeriaTechPage() {
  return (
    <div className="flex flex-col w-full h-full gap-4 lg:p-6">
      <div className="hidden lg:flex w-full">
        <PageHeader
          title="Mensajeria"
          subtitle="Comunicación directa entre técnicos y administradores"
        />
      </div>

      <PanelMensajeria />
    </div>
  );
}

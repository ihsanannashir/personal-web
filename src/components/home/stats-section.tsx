import StatCard from "@/components/ui/stat-card";

const StatsSection = () => {
  return (
    <section className="editorial-container">
      <div className="grid grid-cols-1 sm:grid-cols-3 thin-border rounded-lg">
        <StatCard
          value="3+"
          label="Years of experience"
          sublabel="Across multiple industries"
          className="border-b sm:border-b-0 sm:border-r border-[var(--border)]"
        />
        <StatCard
          value="5"
          label="Companies, 3 countries"
          sublabel="Indonesia · France · Germany"
          className="border-b sm:border-b-0 sm:border-r border-[var(--border)]"
        />
        <StatCard
          value="5"
          label="Languages spoken"
          sublabel="Indonesian, Minang, English, Javanese, German"
          className="border-b sm:border-b-0 sm:border-r border-[var(--border)]"
        />
      </div>
    </section>
  );
};

export default StatsSection;

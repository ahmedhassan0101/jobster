// src/features/jobs/components/StatsContainer.tsx
import styled from "styled-components";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import StatItem from "@/shared/components/StatItem";
import { useAppSelector } from "@/shared/hooks/redux";
import type { JobStatus } from "@/store/job/types";

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 1120px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

interface StatConfig {
  title: string;
  key: JobStatus;
  icon: React.ReactElement;
  color: string;
  bcg: string;
}

const STAT_CONFIG: StatConfig[] = [
  {
    title: "pending applications",
    key: "pending",
    icon: <FaSuitcaseRolling />,
    color: "#D46B08",
    bcg: "#FFF4E5",
  },
  {
    title: "interviews scheduled",
    key: "interview",
    icon: <FaCalendarCheck />,
    color: "#0369A1",
    bcg: "#E8F4FD",
  },
  {
    title: "jobs declined",
    key: "declined",
    icon: <FaBug />,
    color: "#D93856",
    bcg: "#FFEBEB",
  },
];

const StatsContainer = () => {
  const { stats } = useAppSelector((state) => state.allJobs);

  return (
    <StatsGrid>
      {STAT_CONFIG.map(({ title, key, icon, color, bcg }) => (
        <StatItem
          key={key}
          title={title}
          count={stats[key] ?? 0}
          icon={icon}
          color={color}
          bcg={bcg}
        />
      ))}
    </StatsGrid>
  );
};

export default StatsContainer;

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UtensilsCrossed, Star, CalendarCheck, TrendingUp } from "lucide-react";

const stats = [
  { label: "Total Menu Items", value: "16", icon: UtensilsCrossed, change: "+2 this week" },
  { label: "Daily Specials", value: "3", icon: Star, change: "Active today" },
  { label: "Pending Reservations", value: "8", icon: CalendarCheck, change: "5 for today" },
  { label: "Avg. Party Size", value: "4.2", icon: TrendingUp, change: "+0.3 vs last week" },
];

const AdminOverview: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-heading font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Use the sidebar to manage menu items, update daily specials, or review incoming reservation requests. All data is mock — no real backend connected.
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOverview;

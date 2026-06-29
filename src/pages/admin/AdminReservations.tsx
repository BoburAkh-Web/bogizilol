import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type ReservationStatus = "pending" | "confirmed" | "declined";

interface Reservation {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  table: string;
  status: ReservationStatus;
}

const mockReservations: Reservation[] = [
  { id: "r1", name: "Aziz Karimov", phone: "+998 90 123 4567", date: "2026-02-12", time: "19:00", guests: 4, table: "Window", status: "pending" },
  { id: "r2", name: "Maria Ivanova", phone: "+998 91 234 5678", date: "2026-02-12", time: "20:00", guests: 2, table: "Garden", status: "pending" },
  { id: "r3", name: "John Smith", phone: "+998 93 345 6789", date: "2026-02-13", time: "18:30", guests: 6, table: "Private Room", status: "confirmed" },
  { id: "r4", name: "Nodira Alimova", phone: "+998 90 456 7890", date: "2026-02-13", time: "19:30", guests: 3, table: "Indoor", status: "pending" },
  { id: "r5", name: "Dmitriy Petrov", phone: "+998 94 567 8901", date: "2026-02-14", time: "20:00", guests: 2, table: "Window", status: "declined" },
  { id: "r6", name: "Shaxlo Umarova", phone: "+998 91 678 9012", date: "2026-02-14", time: "19:00", guests: 8, table: "Private Room", status: "pending" },
  { id: "r7", name: "Robert Brown", phone: "+998 93 789 0123", date: "2026-02-15", time: "18:00", guests: 5, table: "Garden", status: "confirmed" },
  { id: "r8", name: "Laylo Rashidova", phone: "+998 90 890 1234", date: "2026-02-15", time: "21:00", guests: 4, table: "Indoor", status: "pending" },
];

const statusConfig: Record<ReservationStatus, { label: string; variant: "default" | "secondary" | "destructive" }> = {
  pending: { label: "Pending", variant: "secondary" },
  confirmed: { label: "Confirmed", variant: "default" },
  declined: { label: "Declined", variant: "destructive" },
};

const AdminReservations: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const { toast } = useToast();

  const updateStatus = (id: string, status: ReservationStatus) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
    const res = reservations.find((r) => r.id === id);
    toast({
      title: status === "confirmed" ? "Reservation Confirmed" : "Reservation Declined",
      description: `${res?.name} — ${res?.date} at ${res?.time}`,
    });
  };

  const pending = reservations.filter((r) => r.status === "pending").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Badge variant="secondary" className="text-sm">{pending} pending</Badge>
        <Badge className="text-sm">{reservations.filter((r) => r.status === "confirmed").length} confirmed</Badge>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Guest</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="hidden sm:table-cell">Guests</TableHead>
                <TableHead className="hidden md:table-cell">Table</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservations.map((res) => {
                const sc = statusConfig[res.status];
                return (
                  <TableRow key={res.id}>
                    <TableCell>
                      <div className="font-medium text-sm">{res.name}</div>
                      <div className="text-xs text-muted-foreground">{res.phone}</div>
                    </TableCell>
                    <TableCell className="text-sm">{res.date}</TableCell>
                    <TableCell className="text-sm">{res.time}</TableCell>
                    <TableCell className="hidden sm:table-cell text-sm">{res.guests}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm">{res.table}</TableCell>
                    <TableCell>
                      <Badge variant={sc.variant} className="text-xs">{sc.label}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {res.status === "pending" && (
                        <div className="flex gap-1 justify-end">
                          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => updateStatus(res.id, "confirmed")}>
                            <Check className="h-4 w-4 text-primary" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => updateStatus(res.id, "declined")}>
                            <X className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminReservations;

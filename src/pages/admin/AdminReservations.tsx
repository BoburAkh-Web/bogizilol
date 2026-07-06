import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getReservations, deleteReservation } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


// Backend "date" (ISO) -> chiroyli "10 Jul 2026"
const formatDate = (iso: string) => {
  try {
    return format(new Date(iso), "dd MMM yyyy");
  } catch {
    return iso;
  }
};

const AdminReservations: React.FC = () => {
  const {
    data: reservations = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reservations"],
    queryFn: getReservations,
  });

  const queryClient = useQueryClient();
const { toast } = useToast();

const deleteMutation = useMutation({
  mutationFn: deleteReservation,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["reservations"] });
    toast({ title: "O'chirildi", description: "Bron o'chirildi." });
  },
  onError: (err: Error) => {
    toast({ title: "Xato", description: err.message, variant: "destructive" });
  },
});

const handleDelete = (id: string) => {
  if (confirm("Rostdan ham o'chirmoqchimisiz?")) {
    deleteMutation.mutate(id);
  }
};

  if (isLoading) {
    return <p className="text-muted-foreground p-6">Yuklanmoqda...</p>;
  }

  if (isError) {
    return (
      <p className="text-destructive p-6">
        Xatolik yuz berdi. Qayta urinib ko'ring.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Badge variant="secondary" className="text-sm">
          {reservations.length} ta bron
        </Badge>
      </div>

<Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mehmon</TableHead>
                <TableHead>Sana</TableHead>
                <TableHead>Vaqt</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Mehmonlar
                </TableHead>
                <TableHead className="hidden md:table-cell">Stol</TableHead>
                <TableHead className="hidden lg:table-cell">Izoh</TableHead>
                <TableHead className="text-right">Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservations.map((res) => (
                <TableRow key={res._id}>
                  <TableCell>
                    <div className="font-medium text-sm">
                      {res.user_id?.firstname} {res.user_id?.lastname}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {res.user_id?.phone}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    {formatDate(res.date)}
                  </TableCell>
                  <TableCell className="text-sm">{res.time}</TableCell>
                  <TableCell className="hidden sm:table-cell text-sm">
                    {res.guests_count}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm capitalize">
                    {res.table_preference}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-muted-foreground max-w-[200px] truncate">
                    {res.note}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(res._id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {reservations.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-muted-foreground"
                  >
                    Hozircha bron yo'q.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminReservations;

import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function FiturXYZ() {
  return (
    <div id="fiturxyz-container" className="min-h-screen bg-[#FFF8EC] pb-10">
      <div className="px-10">
        <PageHeader title="Fitur XYZ" breadcrumb={["Home", "Fitur XYZ"]} />
        <p>Ini halaman Fitur XYZ</p>
        <Button variant="outline">Batal</Button>
        <Button variant="ghost">Batal</Button>
        <Button variant="destructive">Batal</Button>
        <Card className="mt-4 w-[380px]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Belajar shadcn/ui</CardTitle>
              <Badge variant="secondary">Baru</Badge>
            </div>
            <CardDescription>
              Contoh penggunaan komponen shadcn/ui di React
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-sm text-muted-foreground">
              Komponen ini dibuat di branch <strong>setup-shadcn</strong>
              lalu di-merge ke main.
            </p>
          </CardContent>

          <CardFooter className="flex gap-2">
            <Button>Simpan</Button>
            <Button variant="outline">Batal</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

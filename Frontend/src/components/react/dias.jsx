import React, { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Calendar, User, Settings, LogOut, Menu, BarChart2, Download, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const AdvancedFinancialDashboard = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [financialData, setFinancialData] = useState({});
  const [showSidebar, setShowSidebar] = useState(false);

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  useEffect(() => {
    // Simulated API call to fetch data
    const fetchData = async () => {
      // In a real app, replace this with an actual API call
      const data = generateMockData(year);
      setFinancialData(data);
    };
    fetchData();
  }, [year]);

  const generateMockData = (year) => {
    const data = {};
    months.forEach((month, index) => {
      const daysInMonth = new Date(year, index + 1, 0).getDate();
      data[month] = Array.from({ length: daysInMonth }, (_, i) => ({
        dia: i + 1,
        ingresos: Math.floor(Math.random() * 1000),
        compras: Math.floor(Math.random() * 500),
        gastos: Math.floor(Math.random() * 300),
        utilidad: 0, // Calculated later
      }));
    });
    return data;
  };

  const calculateUtility = (data) => {
    return data.map(day => ({
      ...day,
      utilidad: day.ingresos - day.compras - day.gastos
    }));
  };

  const currentMonthData = useMemo(() => {
    const monthData = financialData[months[selectedMonth]] || [];
    return calculateUtility(monthData);
  }, [financialData, selectedMonth]);

  const totals = useMemo(() => {
    return currentMonthData.reduce((acc, day) => ({
      ingresos: acc.ingresos + day.ingresos,
      compras: acc.compras + day.compras,
      gastos: acc.gastos + day.gastos,
      utilidad: acc.utilidad + day.utilidad
    }), { ingresos: 0, compras: 0, gastos: 0, utilidad: 0 });
  }, [currentMonthData]);

  const chartData = useMemo(() => {
    return currentMonthData.map(day => ({
      name: `Día ${day.dia}`,
      ingresos: day.ingresos,
      compras: day.compras,
      gastos: day.gastos,
      utilidad: day.utilidad
    }));
  }, [currentMonthData]);

  const handleInputChange = (day, field, value) => {
    const updatedData = currentMonthData.map(item => 
      item.dia === day ? { ...item, [field]: Number(value) } : item
    );
    setFinancialData(prev => ({
      ...prev,
      [months[selectedMonth]]: calculateUtility(updatedData)
    }));
  };

  const exportToPDF = () => {
    const input = document.getElementById('financial-dashboard');
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('financial_report.pdf');
    });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`w-64 ${showSidebar ? '' : 'hidden'} bg-white shadow-md transition-all duration-300 ease-in-out`}>
        <nav className="mt-5 px-2">
          <a href="#" className="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition ease-in-out duration-150">
            <BarChart2 className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" />
            Dashboard
          </a>
          <a href="#" className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition ease-in-out duration-150">
            <Settings className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" />
            Configuración
          </a>
          <a href="#" className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition ease-in-out duration-150">
            <User className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" />
            Perfil
          </a>
          <a href="#" className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition ease-in-out duration-150">
            <LogOut className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" />
            Cerrar Sesión
          </a>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={() => setShowSidebar(!showSidebar)}>
                <Menu className="h-6 w-6" />
              </Button>
              <h1 className="text-lg font-semibold text-gray-900">Dashboard Financiero</h1>
              <div className="flex items-center">
                <Select
                  value={selectedMonth}
                  onValueChange={(value) => setSelectedMonth(Number(value))}
                  className="mr-2"
                >
                  {months.map((month, index) => (
                    <option key={month} value={index}>{month}</option>
                  ))}
                </Select>
                <Input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="w-24"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100" id="financial-dashboard">
          <div className="container mx-auto px-6 py-8">
            {/* Summary cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {Object.entries(totals).map(([key, value]) => (
                <Card key={key}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total {key}</CardTitle>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Info</span>
                            <Info className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Total {key} para {months[selectedMonth]} {year}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${value.toLocaleString()}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Chart */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Resumen Financiero</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="ingresos" fill="#8884d8" />
                    <Bar dataKey="compras" fill="#82ca9d" />
                    <Bar dataKey="gastos" fill="#ffc658" />
                    <Bar dataKey="utilidad" fill="#ff7300" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Data table */}
            <Card>
              <CardHeader>
                <CardTitle>Detalles Diarios</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Día</TableHead>
                      <TableHead>Ingresos</TableHead>
                      <TableHead>Compras</TableHead>
                      <TableHead>Gastos</TableHead>
                      <TableHead>Utilidad</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentMonthData.map((day) => (
                      <TableRow key={day.dia}>
                        <TableCell>{day.dia}</TableCell>
                        {['ingresos', 'compras', 'gastos'].map((field) => (
                          <TableCell key={field}>
                            <Input
                              type="number"
                              value={day[field]}
                              onChange={(e) => handleInputChange(day.dia, field, e.target.value)}
                              className="w-full"
                            />
                          </TableCell>
                        ))}
                        <TableCell>${day.utilidad.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Export button */}
            <div className="mt-8 flex justify-end">
              <Button onClick={exportToPDF}>
                <Download className="mr-2 h-4 w-4" /> Exportar a PDF
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdvancedFinancialDashboard;
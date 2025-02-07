import { format, isToday } from "date-fns";
import { CalendarDays, Utensils, MessageCircleQuestionIcon as QuestionMarkCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { tr } from "date-fns/locale";
import Image from "next/image";

async function getMenuData(): Promise<{ data: FoodMenu[] | null; error: string | null }> {
  try {
    if (!process.env.NEXT_PUBLIC_API_URL) {
      throw new Error('API URL is not defined');
    }
    
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL, {
      next: { revalidate: 3600 }, // Revalidate every hour
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Check if the response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('API did not return JSON');
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching menu data:', error);
    return { 
      data: null, 
      error: error instanceof Error ? error.message : 'Failed to load menu data' 
    };
  }
}

export default async function MenuPage() {
  const { data: menuData, error } = await getMenuData();

  if (error || !menuData) {
    return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <TooltipProvider>
          <div className="container mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">Menü</h1>
              <ThemeSwitcher />
            </div>
            <Image src='/favicon-96x96.png' alt="" width={100} height={100}/>
            <div>Error loading menu data: {error}</div>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <TooltipProvider>
        <div className="container mx-auto py-8 px-4">
          <div className="flex justify-between items-center mb-8">
            <Image src='/favicon-96x96.png' alt="" width={50} height={50}/>
            <h1 className="text-3xl font-bold">Menü</h1>
            <ThemeSwitcher />
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {menuData.map((day) => {
              const dateObj = new Date(day.Date);
              const isMenuForToday = isToday(new Date(dateObj.toISOString()));
              
              return (
                <Card
                  key={day.Id}
                  className={`w-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${isMenuForToday ? "ring-2 ring-primary shadow-lg relative" : ""}`}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <CalendarDays className={`w-4 h-4 ${isMenuForToday ? "text-primary" : ""}`} />
                        {format(dateObj, "EEEE, d MMM yyyy", { locale: tr })}
                      </div>
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      {isMenuForToday && <Badge variant="secondary">Bugün</Badge>}
                      <Badge variant="default">{day.FoodMenuTime.Name}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {day.FoodLists.sort((a, b) => a.FoodListType.Id - b.FoodListType.Id).map((item) => (
                        <div
                          key={item.Id}
                          className="flex items-start justify-between group hover:bg-muted/50 p-2 rounded-lg transition-colors"
                        >
                          <div className="flex items-start gap-2">
                            <Utensils className="w-4 h-4 mt-1 text-muted-foreground group-hover:text-primary transition-colors" />
                            <div className="flex items-start gap-2">
                              <div>
                                <p className="font-medium">{item.Food}</p>
                                <p className="text-sm text-muted-foreground">{item.FoodListType.Name}</p>
                              </div>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <a
                                    href={`https://www.google.com/search?q=${encodeURIComponent(item.Food)}&tbm=isch`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 inline-flex"
                                  >
                                    <QuestionMarkCircle className="w-6 h-6 text-muted-foreground hover:text-primary" />
                                  </a>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{item.Food} için görselleri ara</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                          </div>
                          <Badge variant="outline" className="group-hover:bg-background transition-colors">
                            {item.Calory} kcal
                          </Badge>
                        </div>
                      ))}
                      <div className="pt-4 border-t">
                        <div className="flex justify-between font-medium transition-colors">
                          <span className="font-medium">Toplam Kalori:</span>
                          <span>{day.FoodLists.reduce((sum, item) => sum + item.Calory, 0)} kcal</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
}


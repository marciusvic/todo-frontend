import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useTask } from "@/context/task-context";
import { Priority } from "@/types/task";

const taskSchema = z.object({
  name: z
    .string()
    .min(3, { message: "O nome da tarefa deve ter pelo menos 3 caracteres" }),
  description: z
    .string()
    .min(5, { message: "A descrição deve ter pelo menos 5 caracteres" }),
  dueDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Por favor, insira uma data válida",
  }),
  priority: z.enum(["HIGH", "MEDIUM", "LOW"], {
    required_error: "Por favor, selecione um nível de prioridade",
  }),
});

type TaskFormValues = z.infer<typeof taskSchema>;

export default function CreateTaskPage() {
  const { currentUser: user } = useAuth();
  const navigate = useNavigate();
  const { createNewTask } = useTask();
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      name: "",
      description: "",
      dueDate: new Date().toISOString().split("T")[0],
      priority: "MEDIUM",
    },
  });

  async function onSubmit(data: TaskFormValues) {
    if (!user) return;

    try {
      const task = await createNewTask({
        title: data.name,
        description: data.description,
        dueDate: new Date(data.dueDate),
        priority: data.priority as Priority,
      });
      console.log("Tarefa criada:", task);
      {
        /* toast({
          title: "Tarefa criada",
          description: "Sua tarefa foi criada com sucesso",
        }); */
      }

      navigate("/");
    } catch (error) {
      {
        console.error("Erro ao criar tarefa:", error);
        /* toast({
        title: "Erro",
        description: "Ocorreu um erro ao criar sua tarefa",
        variant: "destructive",
      });*/
      }
    }
  }

  return (
    <>
      <main className="container mx-auto py-6 px-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Criar Nova Tarefa</CardTitle>
            <CardDescription>
              Adicione uma nova tarefa à sua lista
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome da Tarefa</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite o nome da tarefa"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Digite a descrição da tarefa"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data de Entrega</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prioridade</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a prioridade" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="HIGH">Alta</SelectItem>
                            <SelectItem value="MEDIUM">Média</SelectItem>
                            <SelectItem value="LOW">Baixa</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/")}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">Criar Tarefa</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </>
  );
}

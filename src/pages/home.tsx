import type { Task } from "@/types/task";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal, Edit, Trash2, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TaskEditForm from "@/components/task-edit-form";
import { useTask } from "@/context/task-context";
import { Link, useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

export function HomePage() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { tasks, deleteExistingTask, loading } = useTask();
  const navigate = useNavigate();

  const handleDeleteTask = (taskId: number) => {
    deleteExistingTask(taskId);
  };

  const handleEditClick = (task: Task) => {
    setSelectedTask(task);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (task: Task) => {
    setSelectedTask(task);
    setIsDeleteDialogOpen(true);
  };

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "LOW":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    }
  };

  return (
    <>
      <main className="container mx-auto py-6 px-4">
        <div className="w-full space-y-4 md:space-y-0 md:flex md:flex-row md:justify-between mb-6">
          <h1 className="text-3xl font-bold w-fit">Minhas Tarefas</h1>
          <Button onClick={() => navigate("/create-task")}>
            <Plus />
            Criar tarefa
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Skeleton className="text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm h-[150px]" />
            <Skeleton className="text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm h-[150px]" />
            <Skeleton className="text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm h-[150px]" />
            <Skeleton className="text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm h-[150px]" />
            <Skeleton className="text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm h-[150px]" />
            <Skeleton className="text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm h-[150px]" />
            <Skeleton className="text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm h-[150px]" />
            <Skeleton className="text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm h-[150px]" />
            <Skeleton className="text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm h-[150px]" />
            <Skeleton className="text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm h-[150px]" />
            <Skeleton className="text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm h-[150px]" />
            <Skeleton className="text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm h-[150px]" />
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium text-gray-600 dark:text-gray-400">
              Nenhuma tarefa encontrada
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-500">
              Crie uma nova tarefa para começar
            </p>
            <Button className="mt-4" asChild>
              <Link to="/create-task">Criar Tarefa</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <Card
                key={task.id}
                className={task.completed ? "opacity-75" : ""}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority === "HIGH"
                        ? "Alta"
                        : task.priority === "MEDIUM"
                        ? "Média"
                        : "Baixa"}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Abrir menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditClick(task)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteClick(task)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardTitle className={task.completed ? "line-through" : ""}>
                    {task.name}
                  </CardTitle>
                  <CardDescription>
                    Prazo: {new Date(task.dueDate).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p
                    className={`text-sm ${
                      task.completed ? "line-through" : ""
                    }`}
                  >
                    {task.description}
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`task-${task.id}`}
                      checked={task.completed}
                      onCheckedChange={() => {}}
                    />
                    <label
                      htmlFor={`task-${task.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {task.completed ? "Concluída" : "Marcar como concluída"}
                    </label>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Tarefa</DialogTitle>
          </DialogHeader>
          {selectedTask && (
            <TaskEditForm task={selectedTask} onTaskUpdated={() => {}} />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Tem certeza de que deseja excluir esta tarefa?</p>
            <p className="font-medium mt-2">{selectedTask?.name}</p>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => selectedTask && handleDeleteTask(selectedTask.id)}
            >
              Excluir
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

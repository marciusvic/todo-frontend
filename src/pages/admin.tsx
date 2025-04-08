import { useAuth } from "@/context/auth-context";
import type { Task } from "@/types/task";
import { useTaskService } from "@/services/task-service";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal, Edit, Trash2, User } from "lucide-react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AdminPage() {
  const { currentUser: user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { getTasks, toggleTaskCompletion, deleteTask } = useTaskService();

  useEffect(() => {
    if (user?.role === "ADMIN") {
      const allTasks = getTasks();
      setTasks(allTasks);
    }
  }, [user]);

  const handleToggleCompletion = (taskId: number) => {
    const updatedTask = toggleTaskCompletion(taskId);
    if (updatedTask) {
      setTasks(tasks.map((task) => (task.id === taskId ? updatedTask : task)));
      toast({
        title: updatedTask.completed
          ? "Task completed"
          : "Task marked as incomplete",
        description: updatedTask.name,
      });
    }
  };

  const handleDeleteTask = (taskId: number) => {
    const success = deleteTask(taskId);
    if (success) {
      setTasks(tasks.filter((task) => task.id !== taskId));
      setIsDeleteDialogOpen(false);
      toast({
        title: "Task deleted",
        description: "The task has been deleted successfully",
      });
    }
  };

  const handleEditClick = (task: Task) => {
    setSelectedTask(task);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (task: Task) => {
    setSelectedTask(task);
    setIsDeleteDialogOpen(true);
  };

  const handleTaskUpdated = (updatedTask: Task) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setIsEditDialogOpen(false);
    toast({
      title: "Task updated",
      description: "The task has been updated successfully",
    });
  };

  const getPriorityBadge = (priority: Task["priority"]) => {
    switch (priority) {
      case "HIGH":
        return <Badge variant="destructive">Alto</Badge>;
      case "MEDIUM":
        return <Badge variant="default">Médio</Badge>;
      case "LOW":
        return <Badge variant="outline">Baixo</Badge>;
    }
  };

  if (user?.role !== "ADMIN") {
    return (
      <>
        <div className="container mx-auto py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p>You do not have permission to view this page.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <main className="container mx-auto py-6 px-4">
        <Card>
          <CardHeader>
            <CardTitle>Admin Dashboard - All Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            {tasks.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-gray-500">No tasks found in the system</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">Status</TableHead>
                    <TableHead>Task</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>User ID</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.map((task) => (
                    <TableRow
                      key={task.id}
                      className={task.completed ? "opacity-60" : ""}
                    >
                      <TableCell>
                        <Checkbox
                          checked={task.completed}
                          onCheckedChange={() =>
                            handleToggleCompletion(task.id)
                          }
                          aria-label={
                            task.completed
                              ? "Mark as incomplete"
                              : "Mark as complete"
                          }
                        />
                      </TableCell>
                      <TableCell className="font-medium">{task.name}</TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {task.description}
                      </TableCell>
                      <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                      <TableCell>
                        {new Date(task.dueDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2" />
                          {task.userId}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleEditClick(task)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteClick(task)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Edit Task Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          {selectedTask && (
            <TaskEditForm
              task={selectedTask}
              onTaskUpdated={handleTaskUpdated}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete this task?</p>
            <p className="font-medium mt-2">{selectedTask?.name}</p>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => selectedTask && handleDeleteTask(selectedTask.id)}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

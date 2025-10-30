import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../constants/url";


const getTasks = async () => (await axios.get(API_URL)).data;
const addTask = async (task: any) => (await axios.post(API_URL, task)).data;
const updateTask = async ({ id, updates }: { id: number; updates: any }) =>
    (await axios.patch(`${API_URL}/${id}`, updates)).data;

const deleteTask = async (id: number | string) =>
    (await axios.delete(`${API_URL}/${id}`)).data;



export const useTasks = () => {
    const queryClient = useQueryClient();

    const { data: tasks = [], isLoading } = useQuery({
        queryKey: ["tasks"],
        queryFn: getTasks,
    });

    const addTaskMutation = useMutation({
        mutationFn: addTask,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
    });

    const updateTaskMutation = useMutation({
        mutationFn: updateTask,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
    });
    const deleteTaskMutation = useMutation({
        mutationFn: deleteTask,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
    });


    return {
        tasks,
        isLoading,
        updateTask: updateTaskMutation.mutate,
        addTask: addTaskMutation.mutate,
        moveTask: updateTaskMutation.mutate,
        deleteTask: deleteTaskMutation.mutate,
    };
};

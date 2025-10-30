import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { API_URL } from "../constants/url";
import { setFetching, setAdding, setUpdating, setDeleting } from "../feature/uiSlice";

const getTasks = async () => {
    const res = await axios.get(`${API_URL}/latest`);
    return res.data?.record?.tasks || [];
};

const addTask = async (task: any) => {
    const current = await axios.get(`${API_URL}/latest`);
    const tasks = current.data?.record?.tasks || [];
    const newTask = { id: Date.now(), ...task };
    const updatedTasks = [...tasks, newTask];
    await axios.put(API_URL, { tasks: updatedTasks });
    return newTask;
};

const updateTask = async ({ id, updates }: { id: number | string; updates: any }) => {
    const current = await axios.get(`${API_URL}/latest`);
    const tasks = current.data?.record?.tasks || [];
    const updated = tasks.map((t: any) => (t.id == id ? { ...t, ...updates } : t));
    await axios.put(API_URL, { tasks: updated });
    return updated.find((t: any) => t.id == id);
};

const deleteTask = async (id: number | string) => {
    const current = await axios.get(`${API_URL}/latest`);
    const tasks = current.data?.record?.tasks || [];
    const updated = tasks.filter((t: any) => t.id != id);
    await axios.put(API_URL, { tasks: updated });
    return { message: "Deleted" };
};

export const useTasks = () => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    const { data: tasks = [], isLoading, isFetching } = useQuery({
        queryKey: ["tasks"],
        queryFn: getTasks,
    });

    useEffect(() => {
        dispatch(setFetching(isLoading || isFetching));
    }, [dispatch, isLoading, isFetching]);

    const addTaskMutation = useMutation({
        mutationFn: addTask,
        onMutate: async () => {
            dispatch(setAdding(true));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
        onSettled: () => {
            dispatch(setAdding(false));
        },
    });

    const updateTaskMutation = useMutation({
        mutationFn: updateTask,
        onMutate: async () => {
            dispatch(setUpdating(true));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
        onSettled: () => {
            dispatch(setUpdating(false));
        },
    });

    const deleteTaskMutation = useMutation({
        mutationFn: deleteTask,
        onMutate: async () => {
            dispatch(setDeleting(true));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
        onSettled: () => {
            dispatch(setDeleting(false));
        },
    });

    return {
        tasks,
        isLoading,
        addTask: addTaskMutation.mutate,
        updateTask: updateTaskMutation.mutate,
        moveTask: updateTaskMutation.mutate,
        deleteTask: deleteTaskMutation.mutate,
    };
};
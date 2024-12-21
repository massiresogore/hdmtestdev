/**
 * @todo YOU HAVE TO IMPLEMENT THE DELETE AND SAVE TASK ENDPOINT, A TASK CANNOT BE UPDATED IF THE TASK NAME DID NOT CHANGE, YOU'VE TO CONTROL THE BUTTON STATE ACCORDINGLY
 */
import { Check, Delete } from '@mui/icons-material';
import { Box, Button, Container, IconButton, TextField, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch.ts';
import { Task } from '../index';
import { toast } from 'react-toastify';

const TodoPage = () => {
  const api = useFetch();
  const [tasks, setTasks] = useState<Task[]>([]);
  // @New Imple
   const [taskData, setTaskData] = useState<Task>({
    id: -1,
    name: "",
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString()
   });

   const handleDisplay = async (task: Task) => {
    setTaskData({
      id: task.id,
      name: task.name,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt
    }) 
  }

  const [refetch, setRefetch] = useState(0);
  const handleFetchTasks = async () => setTasks(await api.get('/tasks'));
  const reFetchData = () => setRefetch((prev) => prev + 1);

  
   // @New Imple
  const resetValue = () => setTaskData({
    id: -1,
    name: "",
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString()
   });
  // @New Imple
  const AddTask = () => {
    if(taskData.id>0){
     handleUpdate(taskData);
    }else{ 
      handleSave(taskData.name);
    }
  }
  
  const handleDelete = async (id: number) => {
    // @todo IMPLEMENT HERE : DELETE THE TASK & REFRESH ALL THE TASKS, DON'T FORGET TO ATTACH THE FUNCTION TO THE APPROPRIATE BUTTON
     api.delete(`/tasks/${id}`);
     toast.warning("tâche supprimée");  
  }

  const handleUpdate = (data: Task)=>{
    api.patch(`/tasks/${data.id}`, {name:data.name, id:data.id});
      toast.success("tâche modifiée");  
      resetValue();
      return;
  }
  const handleSave = async (name:string) => {
    // @todo IMPLEMENT HERE : SAVE THE TASK & REFRESH ALL THE TASKS, DON'T FORGET TO ATTACH THE FUNCTION TO THE APPROPRIATE BUTTON    
    if(name.trim() !== ""){
      api.post('/tasks', {name});
      toast.success("tâche ajoutée");  
      resetValue();
    }else{
      // @New Imple
      toast.error("La tâche ne doit pas être vide");
      return;
     }
  }

  useEffect(() => {
    (async () => {
      handleFetchTasks();
    })();
  }, [refetch]);

  return (
    <Container>
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h2">HDM Todo List</Typography>
      </Box>

      <Box justifyContent="center"  mt={5} flexDirection="column">
        {
          
         tasks.length > 0 ?  tasks.map((task, index) => (
          <Box display="flex" justifyContent="center" alignItems="center" mt={2} gap={1} width="100%" key={index}>
            <TextField size="small" value={task.name} fullWidth sx={{ maxWidth: 350 }} />
            <Box>
              <IconButton color="success" disabled>
                <Check />
              </IconButton>
              <IconButton color="error" onClick={() => {
                handleDelete(task.id);
                reFetchData()
              }}>
                <Delete />
              </IconButton>
              <IconButton color="warning" onClick={() => {
                handleDisplay(task);
                reFetchData()
              }}>
                <EditIcon />
              </IconButton>
            </Box>
          </Box>
        ))
        : <Box display="flex" justifyContent="center">
          <p>No task 😎</p>
        </Box>
        }
       
        <Box display="flex"  justifyContent="center" gap={1} alignItems="center" mt={2}>
          {/*   // @New Imple */}
          <TextField  size='small' value={taskData.name}  onChange={(e)=>setTaskData({...taskData, name:e.target.value})}   id="outlined-basic" label="Tache" variant="outlined" />
          <Button variant="outlined" color={taskData.id > 0 ? "secondary" : "success"} onClick={() => {
            AddTask();
            reFetchData();
            }}>{taskData.id >0 ? "Modifier une tâche": "Ajouter cette tâche"}</Button>
          {/* <Button variant="outlined" onClick={() => {
            handleSave("Nouvelle tâche");
          }}>Ajouter une tâche</Button> */}
        </Box>
      </Box>
    </Container>
  );
}

export default TodoPage;

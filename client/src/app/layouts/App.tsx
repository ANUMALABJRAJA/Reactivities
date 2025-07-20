import { Box, Container, CssBaseline } from "@mui/material";
import { useEffect, useState } from "react"
import axios from "axios"
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/Activities/Dashboard/ActivityDashboard";
function App() {
  const [activities, SetActivities] = useState<Activity[]>([]);
  const [selectedActivity, SetSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, SetEditMode] = useState(false); 

  useEffect( ()=>{
    axios.get<Activity[]>('https://localhost:5001/api/activities')
                  .then(response => SetActivities(response.data));
    
    return () => {}
  },[])

  const handleSelectActivity = (id : string)=>{
    SetSelectedActivity(activities.find(x=> x.id === id));
  }

  const handleOpenForm = (id?: string)=>{
    if(id) handleSelectActivity(id);
    else handleCancelSelectActivity();
    SetEditMode(true);
  }

  const handleFormClose = ()=>{
    SetEditMode(false);
  }


  const handleCancelSelectActivity = () =>{
    SetSelectedActivity(undefined);
  }

  const handleDelete = (id:string)=>{
    SetActivities(activities.filter(x => x.id !== id))
  }

  const handleSubitForm = (activity: Activity)=>{
      if(activity.id){
        SetActivities(activities.map(x => x.id === activity.id ? activity:x))
      }
      else{
        const newActivity = {...activity, id:activities.length.toString()}
        SetSelectedActivity(newActivity)
        SetActivities([...activities,{...newActivity}])
      }
      SetEditMode(false);
  }

  return (
    <Box sx={{bgcolor:'#eeeeee'}}>
    <CssBaseline/>
     <NavBar openForm = {handleOpenForm} />
     <Container maxWidth='xl' sx={{mt:3}}>
      <ActivityDashboard 
      activities={activities}
      selectActivity = {handleSelectActivity}
      cancelSelectActivity = {handleCancelSelectActivity}
      selectedActivity = {selectedActivity}
      editMode = {editMode}
      openForm = {handleOpenForm}
      closeForm = {handleFormClose}
      submitForm={handleSubitForm}
      deleteActivity = {handleDelete}
      />
     </Container>
     
    </Box>
  )
}

export default App

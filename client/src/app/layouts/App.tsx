import { Box, Container, CssBaseline, Typography } from "@mui/material";
import { useState } from "react"
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/Activities/Dashboard/ActivityDashboard";
import { useActivities } from "../../lib/hooks/useActivities";
function App() {
  const [selectedActivity, SetSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, SetEditMode] = useState(false);

  const {activities,isPending } = useActivities();

  const handleSelectActivity = (id: string) => {
    SetSelectedActivity(activities!.find(x => x.id === id));
  }

  const handleOpenForm = (id?: string) => {
    if (id) handleSelectActivity(id);
    else handleCancelSelectActivity();
    SetEditMode(true);
  }

  const handleFormClose = () => {
    SetEditMode(false);
  }


  const handleCancelSelectActivity = () => {
    SetSelectedActivity(undefined);
  }

 


  return (
    <Box sx={{ bgcolor: '#eeeeee', minHeight:'100vh' }}>
      <CssBaseline />
      <NavBar openForm={handleOpenForm} />
      <Container maxWidth='xl' sx={{ mt: 3 }}>
        {!activities || isPending ?
          (<Typography>Loading....</Typography>) : (
            <ActivityDashboard
              activities={activities}
              selectActivity={handleSelectActivity}
              cancelSelectActivity={handleCancelSelectActivity}
              selectedActivity={selectedActivity}
              editMode={editMode}
              openForm={handleOpenForm}
              closeForm={handleFormClose}
              
            />
          )
        }

      </Container>

    </Box>
  )
}

export default App

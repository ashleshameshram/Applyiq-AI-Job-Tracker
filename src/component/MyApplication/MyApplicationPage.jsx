import { useState,useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import BoardColumn from './BoardColumn.jsx'
import Box from '@mui/material/Box';
import AddApplicationForm from './AddApplicationForm.jsx';
import ApplicationCard from './ApplicationCard.jsx';
import AddApplicationRow from './AddApplicationRow.jsx';
import StatsBar from './StatsBar.jsx';
import SearchFilter from './SearchFilter.jsx';

import { DndContext,DragOverlay,PointerSensor,useSensor,useSensors } from '@dnd-kit/core';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import NearMeIcon from '@mui/icons-material/NearMe';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import CancelIcon from '@mui/icons-material/Cancel';
import BoardColumnHeader from './BoardColumnHeader.jsx';


export default function MyApplicationPage() {
    //load saved applications
    const [applications, setApplications] = useState(() => {
        const savedApplications = localStorage.getItem('applications');
        return savedApplications ? JSON.parse(savedApplications) : [];
    });

    const [openAddForm, setOpenAddForm] = useState(false);
    const [editApplication, setEditApplication] = useState(null);
    const [openEditApplication, setOpenEditApplication] = useState(false);
    const [searchFilter,setSearchFilter] = useState('');
    const [activeId, setActiveId] = useState(null);
    const sensors = useSensors(
            useSensor(PointerSensor, {
                activationConstraint: {
                distance: 1,
            },
        })
    );

    const handleDragStart = (e) => {
        setActiveId(e.active.id);
    }

    //search filter
    const filteredApplications  = applications.filter((application) => {
        const search = searchFilter.toLowerCase();

        return(
            application.role?.toLowerCase().includes(search) ||
            application.company?.toLowerCase().includes(search) ||
            application.notes?.toLowerCase().includes(search)   
        );
    });

    //add card btn function
    let handleAddCard = () => {
        setOpenAddForm(true);
    }

    let handleAddApplication = (newApplication) => {
        setApplications([
            ...applications,
            {
                id: uuidv4(),
                ...newApplication
            }
        ]);
    };

    //edit application
    let handleEditApplication = (applications) => {
        setEditApplication(applications);
        setOpenEditApplication(true);
    }
    //update form when editing the form
    const handleUpdateApplication = (updateApplication) => {
        setApplications(
            applications.map((application) => 
                application.id === updateApplication.id
                ? updateApplication : application
            )
        );
    };

    //delete application
    let handleDeleteApplication = (id) => {
        setApplications(
            applications.filter((application) => application.id !== id )
        );
    };

    //add localStorage
    useEffect(() => {
        localStorage.setItem('applications', JSON.stringify(applications));
    },[applications]);

    //drag-end event
    const handleDragEnd = (e) => {
        setActiveId(null);
        const  draggedId = e.active.id;
        const droppedStatus = e.over?.id;
        if(!droppedStatus) return;

        const draggedApplication = applications.find((application) => 
            application.id === draggedId
        );
        if (draggedApplication.status === droppedStatus) return;

        setApplications((prev) => 
            prev.map((application) => 
                application.id === draggedId 
                ? {...application, status: droppedStatus}
                : application
            )
        );
    }

    const columns = [
        {
            title: 'Wishlist',
            status: 'wishlist',
            icon : FavoriteBorderIcon,
            color: '#ed3886',
            bgColor: '#ffd7e8'
        },
        {
            title: 'Applied',
            status: 'applied',
            icon: NearMeIcon,
            color: '#3856ed',
            bgColor: '#d8d3ff'
        },
        {
            title: 'Interview',
            status: 'interview',
            icon: PeopleAltIcon,
            color: '#c038ed',
            bgColor: '#f4d0fe'
        },
        {
            title: 'Offer',
            status: 'offer',
            icon: CardGiftcardIcon,
            color: '#7ded38',
            bgColor: '#d4ffce'
        },
        {
            title: 'Rejected',
            status: 'rejected',
            icon: CancelIcon,
            color: '#ed3e38',
            bgColor: '#ffc9c9'
        },
    ];

    return(
        <Box sx={{ px: { xs: 1.5, sm: 2, md: 3 }, pt: { xs: 14, sm: 10, md:7 } }}>
            <AddApplicationRow onAddcard={handleAddCard}/>
            <StatsBar applications={applications}/>
            
            <BoardColumnHeader />

            <Box sx={{width:'100%',p:2,boxSizing:'border-box',border:'1px solid #eeeeee',borderRadius:3,backgroundColor:'#ffff',mt:2}}>
                <SearchFilter searchFilter={searchFilter} setSearchFilter={setSearchFilter}/>

                <Box sx={{width:'100%', boxSizing: 'border-box',pt:2}}>
                    <DndContext sensors={sensors} onDragEnd={handleDragEnd} onDragStart={handleDragStart}>

                        <Box  sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(auto-fit, minmax(220px, 1fr))' },
                            gap: { xs: 1, sm: 1.5, md: 2 },
                        }}>
                            {columns.map((column) => (
                                <BoardColumn 
                                    key={column.status}
                                    icon={column.icon}
                                    color={column.color}
                                    bgColor={column.bgColor}
                                    title={column.title} 
                                    status={column.status} 
                                    onEdit={handleEditApplication}
                                    onDelete={handleDeleteApplication}
                                    applications={filteredApplications} 
                                />
                            ))}
                        </Box>
                        <DragOverlay> 
                            {activeId ? (
                                <ApplicationCard application={applications.find(
                                        (application) => application.id === activeId
                                    )}
                                />
                            ) : null}
                        </DragOverlay>
                    </DndContext>
                </Box>

                <AddApplicationForm 
                    open={openAddForm}
                    onClose={() => setOpenAddForm(false)}
                    onAddApplication={handleAddApplication}
                />

                <AddApplicationForm 
                    open={openEditApplication}
                    onClose={() => {
                        setOpenEditApplication(false);
                        setEditApplication(null);
                    }}
                    applications={editApplication}
                    onAddApplication={handleUpdateApplication}
                />
            </Box>
        </Box>
    )
}
import React, { useEffect, useState } from 'react'
import './style.css'
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import Cards from './Cards';
import Swal from 'sweetalert2'


function ShowList(props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [gears] = useState('Gears');
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  let todo_task = []
  let upcommig = []
  let overdue = []

  useEffect(() => {
    let filtered = props.List;
    if (searchQuery) {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (priorityFilter !== 'All') {
      filtered = filtered.filter((task) => task.priority === priorityFilter);
    }
    if (gears !== "Gears") {
      let TodayDate = new Date().toLocaleDateString().split("/")
      const formattedDate = `${TodayDate[2]}-${TodayDate[0].padStart(2, '0')}-${TodayDate[1].padStart(2, '0')}`
      if (gears === "Upcoming") {
        filtered = filtered.filter((task) => task.dueDate > formattedDate)
      }
      else if (gears === "Overdue") {
        filtered = filtered.filter((task) => task.dueDate <= formattedDate)
      }
      else if (gears === "Completed") {
        filtered = filtered.filter((task) => task.complete === "complete")
      }
    }
    setFilteredTasks(filtered);
  }, [searchQuery, priorityFilter, gears, props.List]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePriorityFilter = (e) => {
    setPriorityFilter(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className='tbldesign mt-3'>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>Task List</h3>
        <div className='search-bar'>
          <div style={{display:"flex", justifyContent:"space-between"}}>
            <span></span>
            <button type="button" class="btn btn-secondary mb-2" onClick={props.openForm}>Create Task</button>
          </div>

          <input type='text' placeholder='Search' value={searchQuery} onChange={handleSearch} />
          <select value={priorityFilter} onChange={handlePriorityFilter}>
            <option value='All'>All Priorities</option>
            <option value='High'>High</option>
            <option value='Medium'>Medium</option>
            <option value='Low'>Low</option>
          </select>

        </div>
      </div>
      <div>

        <div class="row gx-2 mt-3">
          <div class="col card-sec">
            <h5>Upcoming</h5>

            {
              filteredTasks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((data, index) => {
                  var currentDate = new Date();
                  var dueDate = new Date(data.dueDate);

                  if (dueDate > currentDate && data.complete !== "complete") {
                    upcommig.push(data)
                    console.log("The due date is in the future.");
                    return (
                      <div>
                        <Cards data={data} />
                        <div className='action-box'>
                          <div></div>
                          <div>

                            <AiFillEdit style={{ color: 'green', margin: '0px 5px', fontSize: '20px', }} onClick={() => { props.editData(data); props.openForm() }} />
                            <MdDelete style={{ color: 'red', margin: '0px 5px', fontSize: '20px', }} onClick={() => {

                              Swal.fire({
                                title: "Are you sure?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, delete it!"
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  props.deleteData(data)
                                  Swal.fire({
                                    title: "Deleted!",
                                    text: "Your file has been deleted.",
                                    icon: "success"
                                  });
                                }
                              });
                            }} />
                          </div>
                        </div>
                      </div>
                    )
                  }
                return null
                })
            }

          </div>
          <div class="col card-sec">
            <h5>Overdue</h5>
            {
              filteredTasks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((data, index) => {
                  var currentDate = new Date();
                  var dueDate = new Date(data.dueDate);

                  if (dueDate <= currentDate && data.complete !== "complete") {
                    overdue.push(data)
                    console.log("The due date has passed.");
                    return (
                      <div>
                        <Cards data={data} />
                        <div className='action-box'>
                          <div></div>
                          <div>

                            <AiFillEdit style={{ color: 'green', margin: '0px 5px', fontSize: '20px', }} onClick={() => { props.editData(data); props.openForm() }} />
                            <MdDelete style={{ color: 'red', margin: '0px 5px', fontSize: '20px', }} onClick={() => {

                              Swal.fire({
                                title: "Are you sure?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, delete it!"
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  props.deleteData(data)
                                  Swal.fire({
                                    title: "Deleted!",
                                    text: "Your file has been deleted.",
                                    icon: "success"
                                  });
                                }
                              });
                            }} />
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                })
            }
          </div>
          <div class="col card-sec">
            <h5>Completed</h5>
            {
              filteredTasks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((data, index) => {
                  if (data.complete === "complete") {
                    todo_task.push(data)

                    return (
                      <div>
                        <Cards data={data} />
                        <div className='action-box'>
                          <div></div>
                          <div>

                            <AiFillEdit style={{ color: 'green', margin: '0px 5px', fontSize: '20px', }} onClick={() => { props.editData(data); props.openForm() }} />
                            <MdDelete style={{ color: 'red', margin: '0px 5px', fontSize: '20px', }} onClick={() => {

                              Swal.fire({
                                title: "Are you sure?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, delete it!"
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  props.deleteData(data)
                                  Swal.fire({
                                    title: "Deleted!",
                                    text: "Your file has been deleted.",
                                    icon: "success"
                                  });
                                }
                              });
                            }} />
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                })
            }

          </div>

        </div>
      </div>
    </div>




  )
}

export default ShowList

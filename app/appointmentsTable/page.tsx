"use client";

import React, { useState, useEffect } from "react";
import styles from "../../styles/appointmentsTable.module.css";
import { useSearchParams } from "next/navigation";
interface Appointment {
  id: number;
  userid: number;
  visittype: string;
  hospital: string;
  selectedshift: string;
  slot: string;
  selecteddate: string;
  status: string;
}

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const searchParams = useSearchParams();
  
  
  
  const docId = searchParams.get("id");
  // ✅ Fetch Appointments
  const fetchAppointments = async () => {
    try {
      const res = await fetch(`http://localhost:3000/doctor/${docId}`);
      const data = await res.json();
      if (data) {
        setAppointments(data.data);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  // ✅ Approve/Decline Appointment
  const updateStatus = async (id: number, status: string) => {
    try {
      const res = await fetch(`http://localhost:3000/updateStatus/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();
      if (data.success) {
        alert(`Appointment ${status}!`);
        fetchAppointments(); // Refresh after update
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(`Error updating status: ${error}`);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className={styles.dashboardContainer}>
    <h2>Upcoming Appointments</h2>
    {appointments.length === 0 ? (
      <p>No upcoming appointments.</p>
    ) : (
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Visit Type</th>
              <th>Hospital</th>
              <th>Shift</th>
              <th>Slot</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.userid}</td>
                <td>{appointment.visittype}</td>
                <td>{appointment.hospital}</td>
                <td>{appointment.selectedshift}</td>
                <td>{appointment.slot}</td>
                <td>{appointment.selecteddate}</td>
                <td>
                  <button
                    onClick={() => updateStatus(appointment.id, "Approved")}
                    className={styles.approveBtn}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(appointment.id, "Declined")}
                    className={styles.declineBtn}
                  >
                    Decline
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
  
  );
};

export default DoctorDashboard;


"use client";

import React, { useEffect, useState } from "react";
import { UserSleepMarker } from "@/lib/definitions";
import $ from "jquery";
import 'bootstrap-table/dist/bootstrap-table.min.css';

interface SleepDataTableProps {
  sleepData: UserSleepMarker[];
}

const SleepDataTable: React.FC<SleepDataTableProps> = ({ sleepData }) => {
  const [visibleColumns, setVisibleColumns] = useState<string[]>(['HRVDate', 'SleepStages', 'SleepDuration']);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import('bootstrap-table').then(() => {
        initializeTable();
      }).catch(err => console.error("Failed to load Bootstrap Table", err));
    }
  }, [visibleColumns]);

  const initializeTable = () => {
    $("#sleepDataTable").bootstrapTable('destroy').bootstrapTable({
      columns: [
        {
          field: 'HRVDate',
          title: 'HRV Date',
          sortable: true,
          sorter: dateSorter,
          visible: visibleColumns.includes('HRVDate')
        },
        {
          field: 'UnformattedHRVDate',
          title: 'Unformatted HRV Date',
          sortable: true,
          sorter: dateSorter,
          visible: visibleColumns.includes('UnformattedHRVDate')
        },
        {
          field: 'SleepOnset',
          title: 'Sleep Onset',
          sortable: true,
          sorter: dateTimeSorter,
          visible: visibleColumns.includes('SleepOnset')
        },
        {
          field: 'UnformattedSleepOnset',
          title: 'Unformatted Sleep Onset',
          sortable: true,
          sorter: dateTimeSorter,
          visible: visibleColumns.includes('UnformattedSleepOnset')
        },
        {
          field: 'WakeUpTime',
          title: 'Wake Up Time',
          sortable: true,
          sorter: dateTimeSorter,
          visible: visibleColumns.includes('WakeUpTime')
        },
        {
          field: 'UnformattedWakeUpTime',
          title: 'Unformatted Wake Up Time',
          sortable: true,
          sorter: dateTimeSorter,
          visible: visibleColumns.includes('UnformattedWakeUpTime')
        },
        {
          field: 'SleepDuration',
          title: 'Sleep Duration',
          sortable: true,
          sorter: sleepDurationSorter,
          formatter: sleepDurationFormatter,
          visible: visibleColumns.includes('SleepDuration')
        },
        {
          field: 'Awake',
          title: 'Awake',
          sortable: true,
          visible: visibleColumns.includes('Awake')
        },
        {
          field: 'Light',
          title: 'Light',
          sortable: true,
          visible: visibleColumns.includes('Light')
        },
        {
          field: 'Deep',
          title: 'Deep',
          sortable: true,
          visible: visibleColumns.includes('Deep')
        },
        {
          field: 'SleepStages',
          title: 'Sleep Stages',
          formatter: sleepStagesFormatter,
          visible: visibleColumns.includes('SleepStages')
        }
      ],
      onPostBody: () => {
        document.querySelectorAll('.bootstrap-table').forEach((table) => { table.classList.remove('d-none') });
      },
      data: sleepData.map(data => ({
        HRVDate: new Date(data.HRVDate).toLocaleDateString('en-GB'),
        UnformattedHRVDate: data.HRVDate,
        SleepOnset: new Date(data.SleepOnset).toLocaleString('en-GB', {
          dateStyle: 'short',
          timeStyle: 'short',
        }),
        UnformattedSleepOnset: data.SleepOnset,
        WakeUpTime: new Date(data.WakeUpTime).toLocaleString('en-GB', {
          dateStyle: 'short',
          timeStyle: 'short',
        }),
        UnformattedWakeUpTime: data.WakeUpTime,
        SleepDuration: computeSleepDuration(data.SleepOnset, data.WakeUpTime),
        Awake: data.Awake,
        Light: data.Light,
        Deep: data.Deep,
        SleepStages: data
      }))
    });
  };

  const handleColumnToggle = (column: string) => {
    setVisibleColumns(prev => prev.includes(column) ? prev.filter(col => col !== column) : [...prev, column]);
  };

  const sleepStagesFormatter = (value: any) => {
    return (
      `<div style="display: flex; width: 100%;">
        <div style="background-color: #ff4d4d; width: ${value.Awake}%; height: 20px;"></div>
        <div style="background-color: #ffd700; width: ${value.Light}%; height: 20px;"></div>
        <div style="background-color: #4caf50; width: ${value.Deep}%; height: 20px;"></div>
      </div>`
    );
  };

  const sleepDurationFormatter = (value: string, row: any) => {
    const [hours, minutes] = value.split('h ').map(part => parseInt(part, 10));
    const totalMinutes = hours * 60 + minutes;
    let color;

    if (totalMinutes > 480) {
      color = `#008500`;
    } else if (totalMinutes > 420) {
      color = `#07a207`
    } else if (totalMinutes > 360) {
      color = '#01ff01';
    } else if (totalMinutes > 300) {
      color = '#97ff09';
    } else if (totalMinutes > 240) {
      color = '#d4ff3b';
    } else if (totalMinutes > 180) {
      color = '#ffd93b';
     } else if (totalMinutes > 120) {
        color = '#ff753b';
      } else {
        color = '#ff3b3b';
      }
    // if (totalMinutes > 300) { // more than 5 hours
    //   const greenIntensity = Math.min(255, Math.max(50, Math.floor((totalMinutes / 480) * 255)));
    //   color = `rgb(0, ${greenIntensity}, 0)`;
    // } else {
    //   const redIntensity = Math.min(255, Math.max(50, 255 - Math.floor((totalMinutes / 300) * 255)));
    //   color = `rgb(${redIntensity}, 0, 0)`;
    // }
  
    const sleepOnsetTime = new Date(row.UnformattedSleepOnset).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true });
    const wakeUpTime = new Date(row.UnformattedWakeUpTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true });
    return `<div style="display: flex; align-items: center;">
              <div style="width: 12px; height: 12px; border-radius: 50%; background-color: ${color}; margin-right: 8px;"></div>
              <span>${value}<br>${sleepOnsetTime} - ${wakeUpTime}</span>
            </div>`;
  };
  const dateSorter = (a: string, b: string) => {
    return new Date(a.split('/').reverse().join('-')).getTime() - new Date(b.split('/').reverse().join('-')).getTime();
  };

  const dateTimeSorter = (a: string, b: string) => {
    return new Date(a).getTime() - new Date(b).getTime();
  };

  const sleepDurationSorter = (a: string, b: string) => {
    const getTotalMinutes = (duration: string) => {
      const [hours, minutes] = duration.split('h ').map(part => parseInt(part, 10));
      return hours * 60 + minutes;
    };
    return getTotalMinutes(a) - getTotalMinutes(b);
  };

  const computeSleepDuration = (sleepOnset: string, wakeUpTime: string) => {
    const sleepOnsetDate = new Date(sleepOnset);
    const wakeUpTimeDate = new Date(wakeUpTime);
    const duration = wakeUpTimeDate.getTime() - sleepOnsetDate.getTime();
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="sleepdata-nav col-md-9">
      <nav className="position-relative">
        <button className="btn btn-primary mb-3" onClick={() => $("#columnToggle").toggle()}>Toggle Columns</button>
        <div id="columnToggle" className="position-absolute" style={{ display: 'none', zIndex: 2, top: '40px' }}>
          <ul className="border bg-white p-3 list-unstyled">
            {['HRVDate', 'UnformattedHRVDate', 'SleepOnset', 'UnformattedSleepOnset', 'WakeUpTime', 'UnformattedWakeUpTime', 'SleepDuration', 'Awake', 'Light', 'Deep', 'SleepStages'].map((column, index) => (
              <li key={`${index}-${column}`}><label className="mr-3">
                <input
                  type="checkbox"
                  checked={visibleColumns.includes(column)}
                  onChange={() => handleColumnToggle(column)}
                /> {column}
              </label>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      {sleepData.length > 0 ? (
        <table
          id="sleepDataTable"
          className="table bootstrap-table d-none"
          data-toggle="table"
        >
          <thead>
            <tr>
              <th data-field="HRVDate" data-sortable="true">
                HRV Date
              </th>
              <th data-field="UnformattedHRVDate" data-sortable="true">
                Unformatted HRV Date
              </th>
              <th data-field="SleepOnset" data-sortable="true">
                Sleep Onset
              </th>
              <th data-field="UnformattedSleepOnset" data-sortable="true">
                Unformatted Sleep Onset
              </th>
              <th data-field="WakeUpTime" data-sortable="true">
                Wake Up Time
              </th>
              <th data-field="UnformattedWakeUpTime" data-sortable="true">
                Unformatted Wake Up Time
              </th>
              <th data-field="SleepDuration" data-sortable="true">
                Sleep Duration
              </th>
              <th data-field="Awake" data-sortable="true">
                Awake
              </th>
              <th data-field="Light" data-sortable="true">
                Light
              </th>
              <th data-field="Deep" data-sortable="true">
                Deep
              </th>
              <th data-field="SleepStages">
                Sleep Stages
              </th>
            </tr>
          </thead>
          <tbody>
            {sleepData.map((data, index) => (
              <tr key={index}>
                <td>{new Date(data.HRVDate).toLocaleDateString('en-GB')}</td>
                <td>{data.HRVDate}</td>
                <td>{new Date(data.SleepOnset).toLocaleString('en-GB', {
                  dateStyle: 'short',
                  timeStyle: 'short',
                })}</td>
                <td>{data.SleepOnset}</td>
                <td>{new Date(data.WakeUpTime).toLocaleString('en-GB', {
                  dateStyle: 'short',
                  timeStyle: 'short',
                })}</td>
                <td>{data.WakeUpTime}</td>
                <td>{computeSleepDuration(data.SleepOnset, data.WakeUpTime)}</td>
                <td>{data.Awake}</td>
                <td>{data.Light}</td>
                <td>{data.Deep}</td>
                <td>
                  <div style={{ display: 'flex', width: '100%' }}>
                    <div
                      style={{
                        backgroundColor: '#ff4d4d',
                        width: `${data.Awake}%`,
                        height: '20px',
                      }}
                    />
                    <div
                      style={{
                        backgroundColor: '#ffd700',
                        width: `${data.Light}%`,
                        height: '20px',
                      }}
                    />
                    <div
                      style={{
                        backgroundColor: '#4caf50',
                        width: `${data.Deep}%`,
                        height: '20px',
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No sleep data available for this user.</p>
      )}
    </div>
  );
};

export default SleepDataTable;

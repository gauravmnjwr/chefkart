//xlsx library is used to read/write files of extensions xls/xlsx etc.
import * as XLSX from 'xlsx';
//hooks
import { useEffect, useState } from 'react'
import HowToSort from './components/HowToSort';
import IdSort from './components/IdSort';
function App() {
    //state management 
    const [data, setData] = useState([]);
    const [expandedTable, setExpandedTable] = useState('')

    useEffect(() => {
        //for fetching the data from xls file
        var url = "MOCK_DATA-_1_.xls";
        var oReq = new XMLHttpRequest();
        oReq.open("GET", url, true);
        oReq.responseType = "arraybuffer";
        oReq.onload = function (e) {
            var arraybuffer = oReq.response;
            var data = new Uint8Array(arraybuffer);
            var arr = [];
            for (var i = 0; i !== data.length; ++i) {
                arr[i] = String.fromCharCode(data[i]);
            }
            var bstr = arr.join("");
            var workbook = XLSX.read(bstr, { type: "binary" });
            var first_sheet_name = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[first_sheet_name];
            let renderedList = (XLSX.utils.sheet_to_json(worksheet, { raw: true }));
            setData(renderedList)
        }
        oReq.send();

    }, [])

    //All Handling Events

    //Use to handle Sort of the displayed data depending on Unsort,ASC,DESC
    const handleSort = (typeOfSort) => {
        let sortedData = data;
        sortedData = data.sort((a, b) => {
            let valueA;
            let valueB;
            if (typeOfSort === 'Unsort') {
                return a.id - b.id;
            }
            if (expandedTable === 'Id') {
                if (typeOfSort === 'ASC') {
                    return a.id - b.id;
                }
                else {
                    return (a.id - b.id) * -1;
                }
            }
            if (expandedTable === 'First_Name') {
                valueA = a.first_name;
                valueB = b.first_name;
            }
            else if (expandedTable === 'Last_Name') {
                valueA = a.last_name;
                valueB = b.last_name;
            }
            const reverseOrder = typeOfSort === "ASC" ? 1 : -1;
            return valueA.localeCompare(valueB) * reverseOrder;
        });
        setData(sortedData);
    }

    //Use to handle First Name Click 

    const handleFirstNameClick = () => {
        if (expandedTable) {
            setExpandedTable('');
        }
        else {
            setExpandedTable('First_Name');
        }

    }
    //Use to handle Last Name Click 

    const handleLastNameClick = () => {
        if (expandedTable) {
            setExpandedTable('');
        }
        else {
            setExpandedTable('Last_Name');
        }
    }

    //Used to handle sorting w.r.t id
    const handleIdClick = () => {
        if (expandedTable) {
            setExpandedTable('');
        }
        else {
            setExpandedTable('Id');
        }
    }

    //Use to handle Status => change if the status is true to false and vice versa 
    const handleStatus = (status, id) => {
        const updatedData = data.map((obj) => {
            if (obj.id === id) {
                if (status === 'G') {
                    return { ...obj, status: 'false' };
                }
                else {
                    return { ...obj, status: 'true' };
                }
            }
            return obj;
        })
        setData(updatedData)
    }

    //rendering data and assigning it into table
    var renderedList = data.map((obj) => {
        return (
            <tbody key={obj.id}>
                {obj.status === 'true' ?
                    <tr className='data-row' id='status-green' onClick={() => handleStatus('G', obj.id)}>
                        <td>{obj.id}</td>
                        <td>{obj.first_name}</td>
                        <td>{obj.last_name}</td>
                        <td>{obj.email}</td>
                        <td>{obj.gender}</td>
                        <td>{obj.ip_address}</td>
                        <td>{obj.time}</td>
                        <td>{obj.status}</td>
                        <td>{obj.mobile}</td>
                        <td>{obj.area}</td>
                        <td>{obj.show}</td>
                        <td>{obj.edit}</td>
                    </tr>
                    :
                    <tr className='data-row' id='status-red' onClick={() => handleStatus('R', obj.id)}>
                        <td>{obj.id}</td>
                        <td>{obj.first_name}</td>
                        <td>{obj.last_name}</td>
                        <td>{obj.email}</td>
                        <td>{obj.gender}</td>
                        <td>{obj.ip_address}</td>
                        <td>{obj.time}</td>
                        <td>{obj.status}</td>
                        <td>{obj.mobile}</td>
                        <td>{obj.area}</td>
                        <td>{obj.show}</td>
                        <td>{obj.edit}</td>
                    </tr>
                }
            </tbody>
        )
    })
    return (
        <div className='main-container'>
            <h1 >Table</h1>
            <br />
            <div className='table-container'>
                <table>
                    <tbody>
                        <tr className='heading-row'>
                            <th id='sortable-row' onClick={handleIdClick}>{expandedTable === 'Id' ? <IdSort onClick={handleIdClick} handleSort={handleSort} /> : <span> id  <i className="fa fa-angle-down"></i></span>}</th>
                            <th id='sortable-row' onClick={handleFirstNameClick}>{expandedTable === 'First_Name' ? <HowToSort onClick={handleFirstNameClick} handleSort={handleSort} /> : <span> First Name  <i className="fa fa-angle-down"></i></span>}</th>
                            <th id='sortable-row' onClick={handleLastNameClick}>{expandedTable === 'Last_Name' ? <HowToSort onClick={handleLastNameClick} handleSort={handleSort} /> : <span> Last Name <i className="fa fa-angle-down"></i></span>}</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>ip_address</th>
                            <th>Time</th>
                            <th>Status</th>
                            <th>Mobile</th>
                            <th>Area</th>
                            <th>Show</th>
                            <th>Edit</th>
                        </tr>
                    </tbody>
                    {renderedList}
                </table>
            </div>
        </div>
    )
}

export default App;
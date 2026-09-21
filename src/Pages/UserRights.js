import React, { useState } from "react";
import Switch from "react-switch";
import AuthService from "../Service/AuthService";
import "./UserRights.css";

function UserRights() {
  const [empCode, setEmpCode] = useState("106337");
  const [plantCode, setPlantCode] = useState("1000");
  const [rightsType, setRightsType] = useState("MENU"); // MENU | PLANT

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // 🔹 Load Menu / Plant
  const loadRights = async () => {
    if (!empCode.trim()) {
      alert("Enter Employee Code");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("Token");
      let res;

      if (rightsType === "MENU") {
        res = await AuthService.GetUserMenu(empCode, token);
      } else {
        res = await AuthService.GetUserPlants(empCode, token);
      }

      if (res?.success && Array.isArray(res.data)) {
        const formatted = res.data.map(x => ({
          ...x,
          isAssigned: x.isAssigned === 1
        }));
        setItems(formatted);
      } else {
        setItems([]);
        alert("No data found");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Toggle Menu / Plant
  const toggleRight = (id) => {
    setItems(prev =>
      prev.map(x =>
        (rightsType === "MENU" ? x.menuId : x.plantCode) === id
          ? { ...x, isAssigned: !x.isAssigned }
          : x
      )
    );
  };

  // 🔹 Save Menu / Plant
  const saveRights = async () => {
    setSaving(true);
    try {
      const assigned = items.filter(x => x.isAssigned);
      const unassigned = items.filter(x => !x.isAssigned);

      if (rightsType === "MENU") {
        if (assigned.length)
          await AuthService.setMenuRights({
            userCode: empCode,
            plantCode,
            menuIDs: assigned.map(x => x.menuId),
            assign: true
          });

        if (unassigned.length)
          await AuthService.setMenuRights({
            userCode: empCode,
            menuIDs: unassigned.map(x => x.menuId),
            assign: false
          });
      } else {
        if (assigned.length)
            debugger
          await AuthService.setPlantRights({
            userCode: empCode,
            plantCodes: assigned.map(x => x.plantCode),
            assign: true
          });

        if (unassigned.length)
          await AuthService.setPlantRights({
            userCode: empCode,
            plantCodes: unassigned.map(x => x.plantCode),
            assign: false
          });
      }

      alert(`${rightsType} rights saved successfully`);
      loadRights();
    } catch (err) {
      console.error(err);
      alert("Failed to save rights");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="user-rights-container">
      <h4 className="text-primary mb-3">User Rights</h4>

      <div className="d-flex gap-2 mb-3 align-items-center">
        
        
        <label>Emp Code:</label>
        <input
          className="form-control"
          value={empCode}
          type="number"
          placeholder="Enter Salary Code"
          onChange={(e) => setEmpCode(e.target.value)}
        />
        
        <label>Right Type:</label>
        <select
          className="form-control"
          value={rightsType}
          onChange={(e) => {
            setRightsType(e.target.value);
            setItems([]);
          }}
        >
          <option value="MENU">Menu</option>
          <option value="PLANT">Plant</option>
        </select>        

        <button className="btn btn-primary" onClick={loadRights}>
          Search
        </button>
      </div>

      {items.length > 0 && (
        <>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th width="120">
                  {rightsType === "MENU" ? "Menu ID" : "Plant Code"}
                </th>
                <th>
                  {rightsType === "MENU" ? "Menu Name" : "Plant Name"}
                </th>
                <th width="100">Allow</th>
              </tr>
            </thead>
            <tbody>
              {items.map(x => (
                <tr key={rightsType === "MENU" ? x.menuId : x.plantCode}>
                  <td>{rightsType === "MENU" ? x.menuId : x.plantCode}</td>
                  <td>{rightsType === "MENU" ? x.menuName : x.plantName}</td>
                  <td className="text-center">
                    <Switch
                      checked={x.isAssigned}
                      onChange={() =>
                        toggleRight(
                          rightsType === "MENU" ? x.menuId : x.plantCode
                        )
                      }
                      height={18}
                      width={36}
                      uncheckedIcon={false}
                      checkedIcon={false}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="btn btn-success" onClick={saveRights}>
            Save Rights
          </button>
        </>
      )}
    </div>
  );
}

export default UserRights;

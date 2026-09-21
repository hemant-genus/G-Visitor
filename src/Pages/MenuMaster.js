import React, { useState } from "react";
import Switch from "react-switch";
import MenuProcessService from "../services/MenuProcessService";

function MenuMaster() {
  const [userCode, setUserCode] = useState("");
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch menu list with rights
  const loadMenus = async () => {
    if (!userCode.trim()) return alert("Enter HR Employeecode");
    setLoading(true);
    try {
      const response = await MenuProcessService.getMenuListData(userCode);
      const parsed = response.data.result.map(m => ({
        ...m,
        isAssigned: m.isAssigned === 1 || m.isAssigned === "1" || m.isAssigned === true
      }));
      setMenus(parsed);
    } catch (err) {
      console.error(err);
      alert("Failed to load menus");
    } finally {
      setLoading(false);
    }
  };

  // Handle toggle change
  const toggleRight = (menuID) => {
    setMenus(prev =>
      prev.map(m => m.menuID === menuID ? { ...m, isAssigned: !m.isAssigned } : m)
    );
  };

  // Save all updated rights
  const saveRights = async () => {
    if (!userCode.trim()) return alert("Enter HR Employeecode");

    setSaving(true);
    try {
      const assigned = menus.filter(m => m.isAssigned).map(m => m.menuID);
      const unassigned = menus.filter(m => !m.isAssigned).map(m => m.menuID);

      if (assigned.length > 0) {
        await MenuProcessService.setMenuRights({  
          userCode,
          menuIDs: assigned,
          assign: true,
        });
      }

      if (unassigned.length > 0) {
        await MenuProcessService.setMenuRights({
          userCode,
          menuIDs: unassigned,
          assign: false,
        });
      }

      alert("Rights updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update rights");
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="">
        <div className="col-12 mb-3 border-bottom pb-2">
            <h4 className="text-left text-primary">Menu Rights</h4>
          </div>
      <div className="flex gap-2 items-center">
        <input
          className="border border-gray-400 p-2 rounded flex-1"
          placeholder="Enter HR Employeecode"
          value={userCode}
          onChange={e => setUserCode(e.target.value)}
        />
        <button
          className="btn btn-primary" style={{ marginLeft: 10 }}
          onClick={loadMenus}
        >
          {loading ? "Loading…" : "Search"}
        </button>
      </div>

      {/* Menu Rights Table */}
      {menus.length > 0 && (
        <>
          <table className="w-full mt-4 border-separate border-spacing-y-2">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="border border-gray-300 px-4 py-2 rounded-tl-lg">ID</th>
                <th className="border border-gray-300 px-4 py-2">Menu Name</th>
                <th className="border border-gray-300 px-4 py-2 rounded-tr-lg">Action</th>
              </tr>
            </thead>
            <tbody>
              {menus.map((m, i) => (
                <tr
                  key={m.menuID}
                  className={`${m.isAssigned ? "bg-green-50" : "bg-white"
                    } shadow-sm rounded-md`}
                >
                  <td className="border border-gray-200 px-4 py-2 rounded-bl-lg">{m.menuID}</td>
                  <td className="border border-gray-200 px-4 py-2">{m.menuName}</td>
                  <td className="border border-gray-200 px-4 py-2 rounded-br-lg">
                    <Switch
                      checked={m.isAssigned}
                      onChange={() => toggleRight(m.menuID)}
                      onColor="#22c55e"
                      offColor="#9ca3af"
                      height={18}
                      width={36}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>


          {/* Save Button */}
          <div className="mt-4">
            <button
              className="btn btn-primary"
              onClick={saveRights}
              disabled={saving}
            >
              {saving ? "Saving…" : "Save Rights"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
export default MenuMaster;

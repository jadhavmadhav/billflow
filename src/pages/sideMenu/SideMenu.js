import React, { useEffect, useMemo, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useToast from '../../hooks/useToast';
import { VscDashboard } from 'react-icons/vsc';
import { IoCreateOutline } from 'react-icons/io5';
import { SiBuzzfeed } from 'react-icons/si';
import { GoPeople } from 'react-icons/go';
import { TbReportSearch } from 'react-icons/tb';
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia';
import { MdProductionQuantityLimits } from 'react-icons/md';
import { RiLogoutBoxLine } from 'react-icons/ri';

const MENU_ITEMS = [
  { id: '1', icon: VscDashboard, name: 'Dashboard' },
  { id: '3', icon: IoCreateOutline, name: 'Create Bill' },
  { id: '4', icon: SiBuzzfeed, name: 'Sales' },
  { id: '5', icon: GoPeople, name: 'Customers' },
  { id: '6', icon: TbReportSearch, name: 'Reports' },
  { id: '7', icon: LiaFileInvoiceDollarSolid, name: 'Bills' },
  { id: '8', icon: MdProductionQuantityLimits, name: 'Inventory' },
];

const SideMenu = () => {
  const { showToast } = useToast();
  const [menuList, setMenuList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const navigate = useNavigate();

  useEffect(() => {
    setMenuList(MENU_ITEMS);
  }, []);

  useMemo(() => {
    const currentPath = window.location.pathname;
    const activeItem = menuList.find(item => {
      const path = item.name.toLowerCase().replace(/\s+/g, '-');
      return currentPath.includes(path);
    });
    if (activeItem) {
      setActiveIndex(menuList.indexOf(activeItem));
    }
  }, [menuList]);

  const handleLogout = () => {
    navigate('/login');
    localStorage.setItem('isLogin', JSON.stringify(false));
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <div className="flex-1">
        {menuList.map((item, index) => {
          const { id, name, icon: MenuIcon } = item;
          const path = name.toLowerCase().replace(/\s+/g, '-');

          return (
            <NavLink to={`/${path}`} key={id} className="text-decoration-none">
              <div
                onClick={() => setActiveIndex(index)}
                className={`my-3 pl-10 flex gap-3 items-center py-2 cursor-pointer transition-colors duration-300 ${
                  activeIndex === index
                    ? 'bg-[blue] text-[white]'
                    : 'hover:bg-blue-200 text-gray-800'
                }`}
              >
                <MenuIcon className="text-2xl" />
                <h6
                  className={`text-lg font-medium ${
                    activeIndex === index ? 'text-[white]' : 'text-gray-800'
                  }`}
                >
                  {name}
                </h6>
              </div>
            </NavLink>
          );
        })}
      </div>
      <div className="h-24 border-t border-gray-300">
        <div
          className="my-5 pl-10 flex gap-3 items-center py-2 rounded-lg cursor-pointer hover:bg-red-500 text-gray-800 hover:text-white transition-colors duration-300"
          onClick={handleLogout}
        >
          <RiLogoutBoxLine className="text-2xl" />
          <h6 className="text-lg font-medium">Logout</h6>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;

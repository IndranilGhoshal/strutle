'use client'
import AdminAccountHeader from '@/app/_adminComponents/AdminAccountHeader'
import { adminMenuApi, menuApi } from '@/app/lib/apiService'
import { getLocalStorageData, getPassData, removeLocalStorageData, setLocalStorageData, setPassData, showLoader } from '@/app/lib/common'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';


export default function Layout({ children }) {

  const path = usePathname()

  const router = useRouter()
  const [menu, setMenu] = useState([])

  useEffect(() => {
    let getPath = getLocalStorageData('pathName')
    if (getPath) {
      router.push("/admin/account" + getPath)
    }
    getMenu()
  }, [])

  const getMenu = async () => {
    let response = await menuApi({ mstRolesId: getLocalStorageData('admin')?.mstroleid, list: true });
    if (response.success) {
      let res = response.result
      let t = []
      for (let [i,r] of res.entries()) {
        let data = {
          "_id": r._id,
          "menuName": r.menuName,
          "menuIcon": r.menuIcon,
          "menuUrl": r.menuUrl,
          "submenu": r.submenu,
          "isEdit": r.isEdit,
          "isView": r.isView,
          "collapse": getLocalStorageData('col-key') == i ? true : false
        }
        t.push(data)
      }
      setMenu(t)
      let getPath = getLocalStorageData('pathName')
      if (!getPath) {
        setLocalStorageData('pathName', response.result[0].menuUrl)
        let getPath = getLocalStorageData('pathName')
        router.push("/admin/account" + getPath)
      }
    } else {
      setMenu([])
    }
  }

  const goto = (path) => {
    showLoader()
    router.push("/admin/account" + path)
    removeLocalStorageData("pathName")
    setLocalStorageData('pathName', path)
  }

  const getCollapse = (index) =>{
    let m = [...menu]
    let t = []
    for(let [i,obj] of m.entries()){
      if(i == index){
        if(obj.collapse){
          obj.collapse = false
        }else{
          obj.collapse = true
        }
      }
      t.push(obj)
    }
    setMenu(t)
  }

  const removeCollapse = () =>{
    removeLocalStorageData('col-key');
    let m = [...menu]
    let t = []
    for(let [i,obj] of m.entries()){
      obj.collapse = false
      t.push(obj)
    }
    setMenu(t)
  }


  return (
    <>
      <div className={`wrapper dashboardSection`}>
        <nav id="sidebar-new" className="sidebar-new">
          <div className="sidebar-content" id="sidebar-sticky">

            <div className="sidebar-brand text-start">
              <Image
                src="/assets/img/srutle-logo.png"
                alt="bell"
                width={100}
                height={100}
                className="d-inline-block align-middle"
              />
            </div>

            {
              menu && menu.map((item, i) => (

                <div key={i} className="accordion accordion-flush" id="accordionFlushExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingOne">
                      {
                        item.submenu.length > 0 ?
                          <>
                            <button
                              className={`accordion-button ${!item.collapse ? "collapsed" : ""}`}
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={"#flush-collapseOne" + i}
                              aria-expanded="false"
                              aria-controls={"flush-collapseOne" + i}
                              onClick={() => { getCollapse(i) }}
                            >
                              <Image
                                src={"/assets/img/" + item.menuIcon}
                                alt="bell"
                                width={14}
                                height={14}
                                className="d-inline-block align-middle me-2"
                              />
                              <span className='text-blue'>{item.menuName}</span>
                            </button>
                          </>
                          :
                          <>
                            <button
                              className={`accordion-button non ${path == "/admin/account" + item.menuUrl ? "actived" : ""}`}
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={"#flush-collapseOne" + i}
                              aria-expanded="false"
                              aria-controls={"flush-collapseOne" + i}
                              onClick={() => { goto(item.menuUrl); removeCollapse() }}
                            >
                              <Image
                                src={"/assets/img/" + item.menuIcon}
                                alt="bell"
                                width={14}
                                height={14}
                                className="d-inline-block align-middle me-2"
                              />
                              <span className='text-blue'>{item.menuName}</span>
                            </button>
                          </>
                      }

                    </h2>
                    {
                      item.submenu.length > 0 ? <div
                        id={"flush-collapseOne" + i}
                        className={`accordion-collapse collapse ${item.collapse ? "show" : ""}`}
                        aria-labelledby="flush-headingOne"
                        data-bs-parent="#accordionFlushExample"

                      >
                        <div className="accordion-body">
                          {
                            item.submenu.map((obj, index) => (
                              <div
                                className={`submenu-btn ${path == "/admin/account" + obj.submenurl ? "actived" : ""}`}
                                key={index}
                                onClick={() => { goto(obj.submenurl); setLocalStorageData('col-key', i); }}
                              >
                                <Image
                                  src={"/assets/img/" + obj.submenuicon}
                                  alt="bell"
                                  width={14}
                                  height={14}
                                  className="d-inline-block align-middle me-2"
                                />
                                {obj.submenuname}
                              </div>
                            ))
                          }
                        </div>
                      </div>
                        : null
                    }
                  </div>
                </div>
              ))
            }

          </div>

        </nav>
        <div className="main">
          <AdminAccountHeader />
          <main className="content">
            {children}
          </main>
        </div>
      </div >
      <ToastContainer />
    </>
  )
}

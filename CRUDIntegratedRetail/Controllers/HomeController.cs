
using CRUDIntegratedRetail.Models;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MvcApplication1.Controllers
{
    public class HomeController : Controller
    {
        //call DB
        ItemsDB itemsDB = new ItemsDB();

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult List()
        {
            return Json(itemsDB.ListAll(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Add(Items items)
        {
            return Json(itemsDB.Add(items), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetbyID(int ID)
        {
            var Items = itemsDB.ListAll().Find(x => x.ItemsId.Equals(ID));
            return Json(Items, JsonRequestBehavior.AllowGet);
        }


        public JsonResult Update(Items items)
        {
            return Json(itemsDB.Update(items), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int ID)
        {
            return Json(itemsDB.Delete(ID), JsonRequestBehavior.AllowGet);
        }

    }
}

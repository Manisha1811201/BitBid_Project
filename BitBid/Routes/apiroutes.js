const router=require("express").Router();

const techController=require("../Server/Technology/techController");
const postController=require("../Server/Post/postController");
const queryController=require("../Server/Query/queryController");
const rateController=require("../Server/Rating/rateController");
const bidController=require("../Server/Bid/bidController");
const taskController=require("../Server/Task/taskController");
const custController=require("../Server/Customer/custController")

router.post("/tech/add",techController.add)
router.post("/tech/getall",techController.getall)
router.post("/tech/getsingle",techController.getsingleData)
router.post("/tech/delete",techController.deletedata)
router.post("/tech/update",techController.updateData)


router.post("/post/add",postController.add)
router.post("/post/getall",postController.getall)
router.post("/post/getsingle",postController.getsingleData)
router.post("/post/delete",postController.deleteData)
router.post("/post/update",postController.updateData)


router.post("/query/add",queryController.add)
router.post("/query/getall",queryController.getall)
router.post("/query/getsingle",queryController.getsingleData)
router.post("/query/delete",queryController.deletedata)
router.post("/query/update",queryController.updateData)


router.post("/rate/add",rateController.add)
router.post("/rate/getall",rateController.getall)
router.post("/rate/getsingle",rateController.getsingleData)
router.post("/rate/delete",rateController.deletedata)
router.post("/rate/update",rateController.updateData)


router.post("/bid/add",bidController.add)
router.post("/bid/getall",bidController.getall)
router.post("/bid/getsingle",bidController.getsingleData)
router.post("/bid/delete",bidController.deletedata)
router.post("/bid/update",bidController.updateData)

router.post("/task/add",taskController.add)
router.post("/task/getall",taskController.getall)
router.post("/task/getsingle",taskController.getsingleData)
router.post("/task/delete",taskController.deleteData)
router.post("/task/update",taskController.updateData)

router.post("/cust/register",custController.register)

module.exports=router
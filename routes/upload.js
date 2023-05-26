const multer = require('koa-multer')
const fs = require('fs')
const path = require('path')
const router = require('koa-router')()
router.prefix('/upload')

const upload = multer({
    storage: multer.diskStorage({
        // 设置文件的存储位置
        destination: function (req, file, cb){
            // 对每一天生成的图片单独使用文件夹进行管理
            // 创建时间对象
            let date = new Date()
            let year = date.getFullYear()
            let month = date.getMonth()
            let day = date.getDay()
            let dir = "./public/uploads/" + year + month + day

            // 判断目录是否存在
            if(!fs.existsSync(dir)){
                fs.mkdirSync(dir,{
                    recursive: true
                })
            }
            cb(null,dir)
        },
        // 设置上传文件的名称
        filename: function (req,file,cb){
            let fileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname)
            cb(null,fileName)
        }
    })
})

// 编写上传接口,使用upload中间件处理图片信息
router.post('/img', upload.single('myfile'),async ctx =>{
    // 对上传后的地址进行简单修饰
    let path = ctx.req.file.path
    path = ctx.origin + '' + path.replace('public','')
    ctx.body = {
        data: path
    }
})

 //富文本编辑器上传图片
router.post('/editor/img',upload.single('editorFile'),async ctx => {
    let path = ctx.req.file.path
    path = ctx.origin + '' + path.replace('public','')
    ctx.body = {
        errno: 0,
        data: [{
            url: path,
            alt: '',
            href: ''
        }]
    }
})



module.exports = router

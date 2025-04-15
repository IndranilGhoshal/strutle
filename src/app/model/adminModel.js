const { default: mongoose } = require("mongoose");

const adminModel = new mongoose.Schema({
    mstroleid:String,
    image:String,
    firstname:String,
    lastname:String,
    email:String,
    countryname:String,
    countrycode:String,
    dialCode:String,
    phone:String,
    status:String,
    password:String,
    isfirstlogin:String,
    createdby:String,
    createdAt:String
},
{
    timestamps:true
});

export const adminSchema = mongoose.models.mstadmins || mongoose.model("mstadmins", adminModel);


const adminRoleModel = new mongoose.Schema({
    mstAdminsId:String,
    mstRolesId:String
});

export const adminRoleSchema = mongoose.models.mstadminroles || mongoose.model("mstadminroles", adminRoleModel);

const adminRoleMenuModel = new mongoose.Schema({
    mstRolesId:String,
    mstMenusId:String,
    isEdit:String,
    isView:String,
    isDelete:String
});

export const adminRoleMenuSchema = mongoose.models.mstrolespermissions || mongoose.model("mstrolespermissions", adminRoleMenuModel);


const adminMenuModel = new mongoose.Schema({
    menuName:String,
    menuIcon:String,
    menuUrl:String,
    status:String
});

export const adminMenuSchema = mongoose.models.mstmenus || mongoose.model("mstmenus", adminMenuModel);

const roleModel = new mongoose.Schema({
    role:String,
    roletype:String,
    status:String,
    createdAt:Date
},
{
    timestamps:true
});

export const roleSchema = mongoose.models.mstroles || mongoose.model("mstroles", roleModel);


const adminSubMenuModel = new mongoose.Schema({
    mstmenuid:String,
    submenuname:String,
    submenuicon:String,
    submenurl:String,
    status:String
});

export const adminSubMenuSchema = mongoose.models.mstsubmenus || mongoose.model("mstsubmenus", adminSubMenuModel);


const categoryModel = new mongoose.Schema({
    name:String,
    image:String,
    status:String,
    createdAt:String
},{
    timestamps:true
});

export const categorySchema = mongoose.models.mstcategories || mongoose.model("mstcategories", categoryModel);


const subCategoryModel = new mongoose.Schema({
    mstcategoryid:String,
    name:String,
    image:String,
    status:String,
    createdAt:String
},{
    timestamps:true
});

export const subCategorySchema = mongoose.models.mstsubcategories || mongoose.model("mstsubcategories", subCategoryModel);


const productTypeModel = new mongoose.Schema({
    mstcategoryid:String,
    mstsubcategoryid:String,
    name:String,
    image:String,
    status:String,
    createdAt:String
},{
    timestamps:true
});

export const productTypesSchema = mongoose.models.mstproducttypes || mongoose.model("mstproducttypes", productTypeModel);


const productTypeAttributeModel = new mongoose.Schema({
    mstproducttypeid:String,
    fieldname:String,
    isdefault:String,
    ismandatory:String,
    isfilter:String,
    fieldinputtype:String,
    maxvalue:String,
    maxfile:String,
    status:String,
    accordionarray:Array,
    createdAt:String
},{
    timestamps:true
});

export const productTypesAttributeSchema = mongoose.models.mstproducttypeattributes || mongoose.model("mstproducttypeattributes", productTypeAttributeModel);

const productTypeAttributeValueModel = new mongoose.Schema({
    mstproducttypeattributeid:String,
    name:String,
    status:String,
    createdAt:String
},{
    timestamps:true
});

export const productTypesAttributeValueSchema = mongoose.models.mstproducttypeattributevalues || mongoose.model("mstproducttypeattributevalues", productTypeAttributeValueModel);


const sellerModel = new mongoose.Schema({
    image:String,
    firstname:String,
    lastname:String,
    email:String,
    phone:String,
    status:String,
    password:String,
    createdAt:String
},
{
    timestamps:true
});

export const sellerSchema = mongoose.models.mstsellers || mongoose.model("mstsellers", sellerModel);


const partnerModel = new mongoose.Schema({
    image:String,
    firstname:String,
    lastname:String,
    email:String,
    phone:String,
    status:String,
    password:String,
    createdAt:String
},
{
    timestamps:true
});

export const partnerSchema = mongoose.models.mstpartners || mongoose.model("mstpartners", partnerModel);


const consumerModel = new mongoose.Schema({
    image:String,
    firstname:String,
    lastname:String,
    email:String,
    dateofbirth:String,
    gender:String,
    phone:String,
    status:String,
    createdAt:String
},
{
    timestamps:true
});

export const consumerSchema = mongoose.models.mstconsumers || mongoose.model("mstconsumers", consumerModel);

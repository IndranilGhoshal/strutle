import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { favouritesSchema, productcolorvariantsvaluesSchema, productimageSchema, productlistSchema, productotherattributesSchema, productotherattributevaluesSchema, productreviewSchema, productSchema } from "@/app/model/consumerModal";
import { categorySchema, productTypesSchema, subCategorySchema } from "@/app/model/adminModel";

export async function POST(request) {
    let payload = await request.json();
    let result;
    let success = false;
    let message;
    let listlength;
    let filter;
    let sortObj;
    await mongoose.connect(connectionStr, { useNewUrlParser: true });

    //List
    if (payload.list) {

        if (payload.mstcategoryid) {
            // Filter //
            if (payload.categoryfiltteridarray.length > 0) {
                filter = { mstcategoryid: payload.mstcategoryid, mstsubcategoryid: { $in: payload.categoryfiltteridarray }, status: { $in: ['0'] } };
            } else {
                filter = { mstcategoryid: payload.mstcategoryid, status: { $in: ['0'] } };
            }
        } else if (payload.mstsubcategoryid) {
            // Filter //
            if (payload.categoryfiltteridarray.length > 0) {
                filter = { mstsubcategoryid: payload.mstsubcategoryid, mstsubcategoryid: { $in: payload.categoryfiltteridarray }, status: { $in: ['0'] } };
            } else {
                filter = { mstsubcategoryid: payload.mstsubcategoryid, status: { $in: ['0'] } };
            }
        } else if (payload.mstproducttypeid) {
            // Filter //
            if (payload.categoryfiltteridarray.length > 0) {
                filter = { mstproducttypeid: payload.mstproducttypeid, mstsubcategoryid: { $in: payload.categoryfiltteridarray }, status: { $in: ['0'] } };
            } else {
                filter = { mstproducttypeid: payload.mstproducttypeid, status: { $in: ['0'] } };
            }
        }
        // Sort //
        sortObj = {}
        // ------------List Length Start------------ //
        let len = await productlistSchema.find(filter);
        listlength = len.length
        // ------------List Length End------------ //
        // ------------List Start------------ //
        let results = await productlistSchema.find(filter).sort(sortObj).limit(payload.limit).skip(payload.skip);

        let tempres = []

        //Size    
        if (payload.sizefiltter && !payload.colorfiltter && !payload.ratingfiltter && !payload.discountfiltter && !payload.pricefiltter) {
            let resulttemp = results
            let t = []
            for (let rt of resulttemp) {
                let ratingresult = await productotherattributevaluesSchema.find({ mstproductid: rt._id })
                if (ratingresult.length > 0) {
                    for (let rr of ratingresult) {
                        t.push(rr)
                    }
                }
            }
            let ft = []
            if (t.length > 0) {
                for (let temp of t) {
                    if (payload.sizefiltter === temp.value) {
                        ft.push(temp)
                    }
                }
            }
            const uniqueArray = [...new Map(ft.map(item => [item.mstproductid, item])).values()]
            for (let res of resulttemp) {
                for (let f of uniqueArray) {
                    if (res._id == f.mstproductid) {
                        tempres.push(res)
                    }
                }
            }
        }
        //Color    
        else if (payload.colorfiltter && !payload.ratingfiltter && !payload.discountfiltter && !payload.pricefiltter && !payload.sizefiltter) {
            let resulttemp = results
            let t = []
            for (let rt of resulttemp) {
                let ratingresult = await productcolorvariantsvaluesSchema.find({ mstproductid: rt._id })
                if (ratingresult.length > 0) {
                    for (let rr of ratingresult) {
                        t.push(rr)
                    }
                }
            }
            let ft = []
            if (t.length > 0) {
                for (let temp of t) {
                    if (payload.colorfiltter === temp.colorname) {
                        ft.push(temp)
                    }
                }
            }
            const uniqueArray = [...new Map(ft.map(item => [item.mstproductid, item])).values()]
            for (let res of resulttemp) {
                for (let f of uniqueArray) {
                    if (res._id == f.mstproductid) {
                        tempres.push(res)
                    }
                }
            }
        }
        //Price
        else if (payload.pricefiltter && !payload.ratingfiltter && !payload.discountfiltter && !payload.colorfiltter && !payload.sizefiltter) {
            let resulttemp = results
            let ft = []
            if (resulttemp.length > 0) {
                for (let temp of resulttemp) {
                    let discountedprice = ((Number(temp.productmrp) - (Number(temp.productdiscount) / 100) * Number(temp.productmrp))).toFixed()
                    if (payload.pricefiltter == "Under 299") {
                        if (discountedprice <= 299 && discountedprice > 0) {
                            ft.push(temp)
                        }
                    } else if (payload.pricefiltter == "300 - 500") {
                        if (discountedprice >= 300 && discountedprice <= 500) {
                            ft.push(temp)
                        }
                    } else if (payload.pricefiltter == "501 - 999") {
                        if (discountedprice >= 501 && discountedprice <= 999) {
                            ft.push(temp)
                        }
                    } else if (payload.pricefiltter == "1000 - 1499") {
                        if (discountedprice >= 1000 && discountedprice <= 1499) {
                            ft.push(temp)
                        }
                    }
                    else if (payload.pricefiltter == "1500 - 1999") {
                        if (discountedprice >= 1500 && discountedprice <= 1999) {
                            ft.push(temp)
                        }
                    }
                    else if (payload.pricefiltter == "2000 - 2999") {
                        if (discountedprice >= 2000 && discountedprice <= 2999) {
                            ft.push(temp)
                        }
                    }
                    else if (payload.pricefiltter == "Above 3000") {
                        if (discountedprice >= 3000) {
                            ft.push(temp)
                        }
                    }
                }
            }
            for (let res of resulttemp) {
                for (let f of ft) {
                    if (res._id == f._id) {
                        tempres.push(res)
                    }
                }
            }
        }
        //Discount
        else if (!payload.ratingfiltter && payload.discountfiltter && !payload.pricefiltter && !payload.colorfiltter && !payload.sizefiltter) {
            let resulttemp = results
            let ft = []
            if (resulttemp.length > 0) {
                for (let temp of resulttemp) {
                    if (payload.discountfiltter == "9% and Below") {
                        if (temp.productdiscount <= 9 && temp.productdiscount > 0) {
                            ft.push(temp)
                        }
                    } else if (payload.discountfiltter == "10% and Above") {
                        if (temp.productdiscount >= 10) {
                            ft.push(temp)
                        }
                    } else if (payload.discountfiltter == "30% and Above") {
                        if (temp.productdiscount >= 30) {
                            ft.push(temp)
                        }
                    } else if (payload.discountfiltter == "50% and Above") {
                        if (temp.productdiscount >= 50) {
                            ft.push(temp)
                        }
                    }
                }
            }
            for (let res of resulttemp) {
                for (let f of ft) {
                    if (res._id == f._id) {
                        tempres.push(res)
                    }
                }
            }
        }
        //Rating    
        else if (payload.ratingfiltter && !payload.discountfiltter && !payload.pricefiltter && !payload.colorfiltter && !payload.sizefiltter) {
            let resulttemp = results
            let t = []
            for (let rt of resulttemp) {
                let ratingresult = await productreviewSchema.find({ mstproductid: rt._id })
                if (ratingresult.length > 0) {
                    for (let rr of ratingresult) {
                        t.push(rr)
                    }
                }
            }
            let ft = []
            if (t.length > 0) {
                for (let temp of t) {
                    if (payload.ratingfiltter == "1.0 and Above") {
                        if (temp.rate >= 1) {
                            ft.push(temp)
                        }
                    } else if (payload.ratingfiltter == "2.0 and Above") {
                        if (temp.rate >= 2) {
                            ft.push(temp)
                        }
                    } else if (payload.ratingfiltter == "3.0 and Above") {
                        if (temp.rate >= 3) {
                            ft.push(temp)
                        }
                    } else if (payload.ratingfiltter == "4.0 and Above") {
                        if (temp.rate >= 4) {
                            ft.push(temp)
                        }
                    }
                }
            }
            for (let res of resulttemp) {
                for (let f of ft) {
                    if (res._id == f.mstproductid) {
                        tempres.push(res)
                    }
                }
            }
        }

        if (tempres.length > 0) {
            results = tempres
        }

        if (results.length > 0) {
            let res = []
            for (let r of results) {
                let img = await productimageSchema.findOne({ mstproductid: r._id, productmainimage: { $in: ['1'] }, status: { $in: ['0'] } })
                let image = ""
                if (img) {
                    image = img.productimage
                }
                let rating = await productreviewSchema.find({ mstproductid: r.id, status: { $in: ['0'] } })
                let averate = 0;
                let rateingcount = 0;
                // Discounted Price: ₹1000 - (10/100 * ₹1000) = ₹900
                let discountedprice = ((Number(r.productmrp) - (Number(r.productdiscount) / 100) * Number(r.productmrp))).toFixed()
                // GST Amount: (12/100 * ₹900) = ₹108
                let gstamount = ((Number(r.igst) / 100) * discountedprice).toFixed()
                // Net Price: ₹900 + ₹108 = ₹1008
                let netprice = (Number(discountedprice) + Number(gstamount))
                let data = {
                    _id: r._id,
                    image: image,
                    name: r.productname,
                    productmrp: r.productmrp,
                    netmrp: discountedprice,
                    discount: r.productdiscount,
                    productquantity: r.productquantity,
                    averate: 0,
                    rateingcount: 0
                }
                if (rating.length > 0) {
                    for (let [i, r] of rating.entries()) {
                        averate = averate + Number(r.rate)
                        rateingcount = rateingcount + 1
                        if (i == rating.length - 1) {
                            data.averate = (Number(averate) / Number(rateingcount)).toFixed(2),
                                data.rateingcount = rateingcount
                        }
                    }
                } else {
                    data.averate = averate,
                        data.rateingcount = rateingcount
                }
                res.push(data)
            }

            let o = {}
            let fr = []
            let fav = await favouritesSchema.find({ mstconsumerid: payload.mstconsumerid, status: { $in: ['0'] } })

            for (let rs of res) {
                o = {
                    _id: rs._id,
                    image: rs.image,
                    name: rs.name,
                    productmrp: rs.productmrp,
                    netmrp: rs.netmrp,
                    discount: rs.discount,
                    productquantity: rs.productquantity,
                    averate: rs.averate,
                    rateingcount: rs.rateingcount,
                    favourite: "0"
                }
                for (let f of fav) {
                    if (f.mstproductid == rs._id) {
                        o.favourite = "1"
                    }
                }
                fr.push(o)
            }
            if (payload.sortdropdown == "Low to High") {
                fr.sort((a, b) => a.netmrp - b.netmrp)
            } else if (payload.sortdropdown == "High to Low") {
                fr.sort((a, b) => b.netmrp - a.netmrp)
            } else if (payload.sortdropdown == "Discount") {
                fr.sort((a, b) => a.discount - b.discount)
            } else if (payload.sortdropdown == "Rating") {
                fr.sort((a, b) => b.averate - a.averate)
            }
            result = fr
            success = true
            message = "Product found"
        } else {
            success = false
            message = "Product not found"
        }
        // ------------List End------------ //
    }
    else if (payload.filtterlist) {
        let obj = {}
        if (payload.mstcategoryid) {
            //category
            let categoryfilter = { mstcategoryid: payload.mstcategoryid, status: { $in: ['0'] } };
            let categoryresults = await subCategorySchema.find(categoryfilter);
            if (categoryresults) {
                obj.category = categoryresults
            } else {
                obj.category = []
            }
            //size
            let sizefilter = { mstcategoryid: payload.mstcategoryid, status: { $in: ['0'] } };
            let productresults = await productSchema.find(sizefilter);
            let producttemp = productresults
            let fo = []
            for (let t of producttemp) {
                let attributesize = await productotherattributevaluesSchema.find({ mstproductid: t._id })
                let atemp = attributesize
                for (let a of atemp) {
                    fo.push(a.value)
                }
            }
            let size = fo.filter((item, index) => fo.indexOf(item) === index);
            if (productresults) {
                obj.size = size
            } else {
                obj.size = []
            }
            //color
            let fco = []
            for (let t of producttemp) {
                let attributesize = await productcolorvariantsvaluesSchema.find({ mstproductid: t._id })
                let atemp = attributesize
                for (let a of atemp) {
                    fco.push(a.colorname)
                }
            }
            let color = fco.filter((item, index) => fco.indexOf(item) === index);
            if (productresults) {
                obj.color = color
            } else {
                obj.color = []
            }
            //price 
            let pco = [
                { "value": "Under 299" },
                { "value": "300 - 500" },
                { "value": "501 - 999" },
                { "value": "1000 - 1499" },
                { "value": "1500 - 1999" },
                { "value": "2000 - 2999" },
                { "value": "Above 3000" },
            ]
            obj.price = pco
            //discount
            let dco = [
                { "value": "9% and Below" },
                { "value": "10% and Above" },
                { "value": "30% and Above" },
                { "value": "50% and Above" },
            ]
            obj.discount = dco
            //rating
            let rco = [
                { "value": "1.0 and Above" },
                { "value": "2.0 and Above" },
                { "value": "3.0 and Above" },
                { "value": "4.0 and Above" },
            ]
            obj.rating = rco
        }
        else if (payload.mstsubcategoryid) {
            //category
            let subcategoryresults = await subCategorySchema.find({ _id: payload.mstsubcategoryid, status: { $in: ['0'] } });
            if (subcategoryresults) {
                obj.category = subcategoryresults
            } else {
                obj.category = []
            }
            //price 
            let pco = [
                { "value": "Under 299" },
                { "value": "300 - 500" },
                { "value": "501 - 999" },
                { "value": "1000 - 1499" },
                { "value": "1500 - 1999" },
                { "value": "2000 - 2999" },
                { "value": "Above 3000" },
            ]
            obj.price = pco
            //discount
            let dco = [
                { "value": "9% and Below" },
                { "value": "10% and Above" },
                { "value": "30% and Above" },
                { "value": "50% and Above" },
            ]
            obj.discount = dco
            //rating
            let rco = [
                { "value": "1.0 and Above" },
                { "value": "2.0 and Above" },
                { "value": "3.0 and Above" },
                { "value": "4.0 and Above" },
            ]
            obj.rating = rco
        } 
        else {
            //category
            let producttypefilter = await productTypesSchema.findOne({ _id: payload.mstproducttypeid, status: { $in: ['0'] } });
            let subcategoryresults = await subCategorySchema.find({ _id: producttypefilter.mstsubcategoryid, status: { $in: ['0'] } });
            if (subcategoryresults) {
                obj.category = subcategoryresults
            } else {
                obj.category = []
            }
            //other attributes
            let productresults = await productSchema.find({ mstproducttypeid: payload.mstproducttypeid, status: { $in: ['0'] } });
            let fo = []
            for (let t of productresults) {
                let attribute = await productotherattributesSchema.find({ mstproductid: t._id, status: { $in: ['0'] } })
                for (let a of attribute) {
                    let attributevalue = await productotherattributevaluesSchema.find({ mstproductotherattributesid: a._id, status: { $in: ['0'] } })
                    let val = []
                    for (let att of attributevalue) {
                        val.push(att.value)
                    }
                    let size = val.filter((item, index) => val.indexOf(item) === index);
                    fo.push({ "value": a.labelname, array: size })
                }
            }
            function uniqBy(a, key) {
                return [
                    ...new Map(
                        a.map(x => [key(x), x])
                    ).values()
                ]
            }
            let b = uniqBy(fo, JSON.stringify)
            function mergeAndRemoveDuplicates(arr) {
                const merged = [];
                const seen = {};
                for (let i = 0; i < arr.length; i++) {
                    const subArray = arr[i];
                    for (let j = 0; j < subArray.array.length; j++) {
                        const element = subArray.array[j];
                        if (!seen[element]) {
                            merged.push({name:subArray.value,value:element});
                            seen[element] = true;
                        }
                    }
                }
                return merged;
            }
            const res = mergeAndRemoveDuplicates(b);
            const groupBy = (x,f)=>x.reduce((a,b,i)=>((a[f(b,i,x)]||=[]).push(b),a),{});
            obj.other = [groupBy(res,v => v.name)]
            //color
            let fco = []
            for (let t of productresults) {
                let attributesize = await productcolorvariantsvaluesSchema.find({ mstproductid: t._id })
                let atemp = attributesize
                for (let a of atemp) {
                    fco.push(a.colorname)
                }
            }
            let color = fco.filter((item, index) => fco.indexOf(item) === index);
            if (productresults) {
                obj.color = color
            } else {
                obj.color = []
            }
            //price 
            let pco = [
                { "value": "Under 299" },
                { "value": "300 - 500" },
                { "value": "501 - 999" },
                { "value": "1000 - 1499" },
                { "value": "1500 - 1999" },
                { "value": "2000 - 2999" },
                { "value": "Above 3000" },
            ]
            obj.price = pco
            //discount
            let dco = [
                { "value": "9% and Below" },
                { "value": "10% and Above" },
                { "value": "30% and Above" },
                { "value": "50% and Above" },
            ]
            obj.discount = dco
            //rating
            let rco = [
                { "value": "1.0 and Above" },
                { "value": "2.0 and Above" },
                { "value": "3.0 and Above" },
                { "value": "4.0 and Above" },
            ]
            obj.rating = rco
        }
        if (obj) {
            result = obj
            success = true
            message = "Filter found"
        } else {
            success = false
            message = "Filter not found"
        }
    }
    else if (payload.bredcmdetails) {
        let obj;
        if (payload.mstcategoryid) {
            let categoryresults = await categorySchema.findOne({ _id: payload.mstcategoryid, status: { $in: ['0'] } });
            obj = {
                category: categoryresults._id,
                categoryname: categoryresults.name
            }
        } else if (payload.mstsubcategoryid) {
            let subcategoryresults = await subCategorySchema.findOne({ _id: payload.mstsubcategoryid, status: { $in: ['0'] } });
            let categoryresults = await categorySchema.findOne({ _id: subcategoryresults.mstcategoryid, status: { $in: ['0'] } });
            obj = {
                category: categoryresults._id,
                categoryname: categoryresults.name,
                subcategory: subcategoryresults._id,
                subcategoryname: subcategoryresults.name
            }
        } else {
            let producttyperesults = await productTypesSchema.findOne({ _id: payload.mstproducttypeid, status: { $in: ['0'] } });
            let subcategoryresults = await subCategorySchema.findOne({ _id: producttyperesults.mstsubcategoryid, status: { $in: ['0'] } });
            let categoryresults = await categorySchema.findOne({ _id: subcategoryresults.mstcategoryid, status: { $in: ['0'] } });
            obj = {
                category: categoryresults._id,
                categoryname: categoryresults.name,
                subcategory: subcategoryresults._id,
                subcategoryname: subcategoryresults.name,
                producttype: producttyperesults._id,
                producttypename: producttyperesults.name
            }
        }
        if (obj) {
            result = obj
            success = true
            message = "bredcm found"
        } else {
            success = false
            message = "bredcm not found"
        }
    }
    return NextResponse.json({ result, success, message, listlength })
}

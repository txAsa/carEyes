<template>
    <div class='outbox'>
        <h3>影院匹配</h3>
        <!-- 用户操作部分 -->
        <div style="margin-bottom: 10px;">
            <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
                <el-select v-model="select" slot="prepend" placeholder="请选择" class='wide'>
                    <el-option label="影院名" value="name"></el-option>
                    <el-option label="地址" value="address"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click='search'></el-button>
            </el-input>
            <el-button type="primary" @click='clear'>清空</el-button>
            <el-button type="primary" @click="openouterVisible">新增影院</el-button>
        </div>

        <!-- 表格信息部分 -->
        <el-table ref="multipleTable" :data="getallcinema" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="name" label="影院名" width="200">
            </el-table-column>
            <el-table-column prop="address" label="地址" width="200">
            </el-table-column>
            <el-table-column prop="phone" label="热线" width="200">
            </el-table-column>
            <el-table-column prop="www" label="官网" width="200">
            </el-table-column>
            <el-table-column label="操作" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pageFan">
            <!-- 翻页 -->
            <el-pagination background layout="prev, pager, next" :total="maxPage*10" @current-change='changePage'>
            </el-pagination>
        </div>
        <!-- 新增院线的弹出框 -->
        <el-dialog title="新增院线" :visible.sync="outerVisible" class='widthnew'>

            <!-- 新增厅及座位 -->
            <el-dialog width="65%" title="影厅信息" :visible.sync="newchairopen" append-to-body>
                <el-form label-width="80px">
                    <el-form-item label="影厅名">
                        <el-input v-model="formLabel.name_ting"></el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <!-- 座位的排 -->
                        排：
                        <el-input-number v-model="num1" :min="0" :max="32"></el-input-number>
                        <!-- 座位的列 -->
                        列：
                        <el-input-number v-model="num2" :min="0" :max="50"></el-input-number>
                        <el-button type="primary" @click='proct'>生成</el-button>
                    </el-form-item>
                    <div>
                        <!-- 座位渲染 -->
                        <div class="img">
                            <img src="../../../assets/screen_bg.png" alt="">
                        </div>
                        <div v-for='(item , index) in arrchair' class='chairbox'>
                            <div v-for='(item1 , index1) in item'>
                                <div class='chair' @click='change(index,index1)'>

                                </div>
                            </div>
                        </div>
                    </div>
                    <el-row>
                        <el-button type="primary" @click='saveting'>保存影厅及座位</el-button>
                    </el-row>
                </el-form>
            </el-dialog>
            <div class='newtingxian'>
                <div class='new'>
                    <!-- 新增院线 -->
                    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" class='diagbox'>
                        <el-form-item label="影院名">
                            <el-input v-model="formLabelAlign.name" placeholder="影院名"></el-input>
                        </el-form-item>
                        <el-form-item label="地址">
                            <el-input v-model="formLabelAlign.address" placeholder='地址'></el-input>
                        </el-form-item>
                        <el-form-item label="热线">
                            <el-input v-model="formLabelAlign.phone" placeholder='热线'></el-input>
                        </el-form-item>
                        <el-form-item label="官网">
                            <el-input v-model="formLabelAlign.www" placeholder='官网'></el-input>
                        </el-form-item>
                        <!-- 多选 -->
                        <div style="margin-top: 20px">
                            <div>影院特色</div>
                            <el-checkbox-group v-model="checkboxGroup5" size="small" class='checkedbox'>
                                <el-checkbox label="座" border></el-checkbox>
                                <el-checkbox label="3D厅" border></el-checkbox>
                                <el-checkbox label="4D厅" border></el-checkbox>
                                <el-checkbox label="杜比全景声厅" border></el-checkbox>
                                <el-checkbox label="IMAX厅" border></el-checkbox>
                                <el-checkbox label="儿童厅" border></el-checkbox>
                                <el-checkbox label="折扣价" border></el-checkbox>
                                <el-checkbox label="改签" border></el-checkbox>
                                <el-checkbox label="退" border></el-checkbox>
                                <el-checkbox label="会员卡" border></el-checkbox>
                                <el-checkbox label="小吃" border></el-checkbox>
                            </el-checkbox-group>
                        </div>

                    </el-form>


                </div>

                <div class='outboxxian'></div>
                <div class='new'>
                    <!-- 显示新增的影厅（名），可选择进行删除，不可修改 -->

                    <div v-for='(item,index) in newting' class="newaddSty">
                        <div>{{item.tingname}}</div>
                    </div>
                    <el-row>
                        <div class='updataadd'>
                            <el-button type="primary" @click="inner">新增影厅</el-button>
                        </div>
                    </el-row>

                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="outerVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAll">保存</el-button>
            </div>
        </el-dialog>

        <!--=============================修改院线信息的弹出框====================================================================-->
        <!--========================================修改院线信息=========================================================-->

        <el-dialog title="修改信息" :visible.sync="updatames">
            <!-- 修改新增厅及座位 -->
            <el-dialog width="65%" title="影厅信息" :visible.sync="updata_ting" append-to-body>
                <el-form label-width="80px">
                    <el-form-item label="影厅名">
                        <el-input v-model="updataformLabel.name_ting"></el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <!-- 修改排座位的排 -->
                        排：
                        <el-input-number v-model="updatanum1" :min="0" :max="32"></el-input-number>
                        <!-- 座位的列 -->
                        列：
                        <el-input-number v-model="updatanum2" :min="0" :max="50"></el-input-number>
                        <!-- <el-button type="primary" @click='proct'>生0成</el-button> -->
                    </el-form-item>
                    <div>
                        <!-- 座位渲染 -->
                        <div class="img">
                            <img src="../../../assets/screen_bg.png" alt="">
                        </div>
                        <div v-for='(item , index) in chairarr' class='chairbox'>
                            <div v-for='(item1 , index1) in item'>
                                <div class='chair' v-if='item1==1' @click='UpdataChairRender(item1,index,index1)'></div>
                                <div v-else class='chairchange' @click='UpdataChairRender(item1,index,index1)'></div>
                            </div>
                        </div>
                    </div>
                    <el-row>
                        <el-button type="primary" @click='updatasaveting'>保存更改的信息</el-button>
                    </el-row>
                </el-form>
            </el-dialog>
            <!-- 修改信息里面的新增影厅 -->
            <el-dialog width="65%" title="新增影厅" :visible.sync="addting" append-to-body>
                <el-form label-width="80px">
                    <el-form-item label="影厅名">
                        <el-input v-model="addnew.name_ting"></el-input>
                    </el-form-item>
                    <div class='centersty'>
                        <div>
                            <el-form-item>
                                <!-- 座位的排 -->
                                排：
                                <el-input-number v-model="addnum1" :min="0" :max="32"></el-input-number>
                                <!-- 座位的列 -->
                                列：
                                <el-input-number v-model="addnum2" :min="0" :max="50"></el-input-number>
                                <el-button type="primary" @click='addchair'>生成座位</el-button>
                            </el-form-item>
                        </div>
                    </div>
                    <div>
                        <!-- 修改里面的新增座位渲染 -->
                        <div v-for='(item , index) in updataaddarr' class='chairbox'>
                            <div v-for='(item1 , index1) in item'>
                                <div class='chair' @click='addchange(index,index1)'>

                                </div>
                            </div>
                        </div>
                    </div>
                    <el-row>
                        <el-button type="primary" @click='saveaddupdata'>保存影厅及座位</el-button>
                    </el-row>
                </el-form>
            </el-dialog>



            <div class='newtingxian'>
                <!-- 这里是修改信息显示 -->
                <div class='new'>
                    <el-form :label-position="labelPosition" label-width="80px" :model="updataallmes" class='diagbox'>
                        <el-form-item label="影院名">
                            <el-input v-model="updataallmes.name" placeholder="影院名"></el-input>
                        </el-form-item>
                        <el-form-item label="地址">
                            <el-input v-model="updataallmes.address" placeholder='地址'></el-input>
                        </el-form-item>
                        <el-form-item label="热线">
                            <el-input v-model="updataallmes.phone" placeholder='热线'></el-input>
                        </el-form-item>
                        <el-form-item label="官网">
                            <el-input v-model="updataallmes.www" placeholder='官网'></el-input>
                        </el-form-item>
                        <!-- 水水水水谁谁谁水水水水谁谁谁水水水水谁谁谁 -->
                        <!-- 多选 -->
                        <div style="margin-top: 20px">
                            <div>影院特色</div>
                            <el-checkbox-group v-model="checkboxGroup6" size="small" class='checkedbox'>
                                <el-checkbox label="座" border></el-checkbox>
                                <el-checkbox label="3D厅" border></el-checkbox>
                                <el-checkbox label="4D厅" border></el-checkbox>
                                <el-checkbox label="杜比全景声厅" border></el-checkbox>
                                <el-checkbox label="IMAX厅" border></el-checkbox>
                                <el-checkbox label="儿童厅" border></el-checkbox>
                                <el-checkbox label="折扣价" border></el-checkbox>
                                <el-checkbox label="改签" border></el-checkbox>
                                <el-checkbox label="退" border></el-checkbox>
                                <el-checkbox label="会员卡" border></el-checkbox>
                                <el-checkbox label="小吃" border></el-checkbox>
                            </el-checkbox-group>
                        </div>


                    </el-form>
                </div>
                <!-- 这里是修改信息显示结束 -->
                <div class='outboxxian'></div>
                <div class='new'>
                    <!--显示对应影院对应的影厅-->
                    <el-row>
                        已有影厅
                        <div v-for='(item,index) in getsame'>
                            <div class='tingsty'>
                                <!-- shanchu ============================================================================================ -->
                                <div class='delsty' @click='delting(item._id)'>X</div>
                                <div class='fsSty'>
                                    {{item.tingname}}
                                    <div>
                                        <button class='btnsty' @click='updatameschair(item._id)'>修改座位及厅名</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-for='(item,index) in allsavearr' class='newaddSty'>
                            {{item.tingname}}
                        </div>
                        <div class='updataadd'>
                            <el-button type="primary" @click='addNewting'>新增影厅</el-button>
                        </div>
                    </el-row>
                </div>
            </div>


            <div slot="footer" class="dialog-footer">
                <el-button @click="updatames = false">取 消</el-button>
                <el-button type="primary" @click="updatame">保存修改信息</el-button>
            </div>
        </el-dialog>


    </div>
</template>

<script>
    import axios from 'axios'
    // const IP = 'http://192.168.43.49:5000'
    // const IP = 'http://192.168.11.155:5000'
    // const IP = 'http://192.168.11.105:5000'
    const IP = 'http://127.0.0.1:5000'
    export default {
        data() {
            return {
                checkboxGroup5: [],
                checkboxGroup6: [],
                delReall: false,//二次确认删除
                arrchair: [],//座位数组用来渲染所有座位
                newarr: [],//新的数组用来保存选好的座位
                chairarr: [],//座位反渲染
                updatanewarr: [],//座位重新修改后扩展产生新的数组（用于更新座位）

                updataaddarr: [],//修改信息里面的新增影厅及座位(直接渲染，未改状态)
                addnewarr1: [],//修改信息里面的新增影厅及座位(直接渲染，已改状态)
                allsavearr: [],//修改信息里面的新增，新增的座位选好位置后都存入这里暂时保存

                num1: 0,// 排
                num2: 0,//列
                updatanum1: 0,//修改影厅座位排
                updatanum2: 0,//修改影厅座位列
                addnum1: 0,//修改里面的新增影厅
                addnum2: 0,//修改里面的新增影厅
                input: '',
                outerVisible: false,
                innerVisible: false,
                newchairopen: false,//新增影厅弹出框状态
                updatames: false,//修改弹出框
                updata_ting: false,//打开修改内置框
                addting: false,//修改里面的新增
                input5: '',
                ting_id: '',//零时保存的修改的影厅id，用于修改座位后更新
                chair_id: '',//零时保存的修改的影厅对应座位id，用于修改座位后更新
                cinema_id: '',//零时保存的修改的影院，用于修改后更新
                select: 'name',
                labelPosition: 'right',
                // 新增院线信息
                formLabelAlign: {
                    name: '',
                    address: '',
                    phone: '',
                    www: ''
                },
                // 修改影院影厅信息
                updataallmes: {
                    name: '',
                    address: '',
                    phone: '',
                    www: ''
                },
                //影厅名
                formLabel: {
                    name_ting: ''
                },
                //修改影厅名
                updataformLabel: {
                    name_ting: ''
                },
                //修改里面的新增影厅（名）
                addnew: {
                    name_ting: ''
                },
                newting: [],//新增影厅及座位信息暂时用数组保存（增强用户体验）
                sametingchair: [],  // 获取对应影厅及座位信息
                isSearch: false,//是否是搜索状态
                rows: 10,
                val: 0,
                isDel: false,
            }
        },
        created() {
            this.$store.dispatch({
                type: 'cinema_all',
                page: 1,
                rows: this.rows
            })
        },
        computed: {
            // 获取所有的电影
            getallcinema() {
                return this.$store.state.cinema.cinema
            },
            getallTingid() {
                return this.$store.state.cinema.alltingID
            },
            // 获取到影院对应的影厅（联合查询）
            getsame() {
                return this.$store.state.cinema.allcinemating
            },
            maxPage() {
                return this.$store.state.cinema.maxPage
            }
        },

        methods: {
            //--------------------------翻页-----------------------------------------
            changePage(val) {
                this.val = val;
                this.initData(val, this.rows);
                console.log(val)
            },
            // if总数据的翻页或搜索出的数据翻页
            initData(page, rows) {
                if (this.isSearch) {
                    this.$store.dispatch({
                        type: 'cinema_search',
                        data: this.input5,
                        select: this.select,
                        page,
                        rows
                    })
                } else {
                    this.$store.dispatch({
                        type: 'cinema_all',
                        data: this.input5,
                        select: this.select,
                        page,
                        rows
                    })
                }
            },

            //-----------------------------------座位影厅修改按钮------------------------------------------------
            //    删除影厅
            delting(id) {
                console.log(this.getallcinema)
                axios.post(IP + '/cinema/del_ting', {
                    _id: this.cinema_id
                }).then((data) => {
                    console.log(data.data.cinema_ting)
                    for (let i = 0; i < data.data.cinema_ting.length; i++) {
                        if (data.data.cinema_ting[i] == id) {
                            data.data.cinema_ting.splice(i, 1)
                            axios.post(IP + '/cinema/cinemadel_ting', {
                                _id: this.cinema_id,
                                cinema_ting: JSON.stringify(data.data.cinema_ting)
                            }).then((data) => {
                                axios.post(IP + '/cinema/cinemasamedel_ting', {
                                    _id: id
                                }).then((data) => {
                                    console.log('删除成功');
                                    this.$store.dispatch({
                                        type: 'cinema_sameting',
                                        id: this.cinema_id
                                    })
                                })

                            })
                        }
                    }

                })

            },

            updatameschair(id) {
                // 影厅ajks座位  //点击修改影厅，获取对应的影厅和座位信息
                axios.post(IP + '/cinema/tingchairmes', {
                    _id: id,
                    submitType: "findJoin",
                    ref: ["cinema_chair", '']
                }).then((data) => {
                    this.updataformLabel.name_ting = data.data.tingname
                    this.sametingchair = data.data
                    this.updatanum1 = data.data.cinema_chair[0].chair.length
                    this.updatanum2 = data.data.cinema_chair[0].chair[0].length
                    this.chairarr = data.data.cinema_chair[0].chair
                    this.chair_id = data.data.cinema_chair[0]._id
                    console.log(data.data.cinema_chair[0], '你好')
                })
                this.ting_id = id//将影厅id暂时保存
                this.updata_ting = true;
            },
            //修改影厅的座位
            UpdataChairRender(isnum, index, index1) {
                this.updatanewarr = [...this.chairarr]//修改所产生的新数组
                console.log(isnum, index, index1)
                if (this.chairarr[index][index1] == '1') {
                    event.target.className = "chairchange"
                    this.chairarr[index][index1] = "0"
                } else {
                    event.target.className = "chair"
                    this.chairarr[index][index1] = "1"
                }
                console.log(this.updatanewarr)
            },
            //保存修改的信息
            updatame() {
                this.updatames = false
                this.$store.dispatch({
                    type: 'cinema_updatacinema',
                    id: this.cinema_id,
                    name: this.updataallmes.name,
                    address: this.updataallmes.address,
                    phone: this.updataallmes.phone,
                    www: this.updataallmes.www,
                    special: this.checkboxGroup6
                })
                if (this.allsavearr.length != 0) {
                    this.$store.dispatch({
                        type: 'cinema_updataAddArr',
                        id: this.cinema_id,
                        data: this.allsavearr
                    })
                }
            },


            //保存修改的影厅名和座位
            updatasaveting() {
                if (this.updataformLabel.name_ting == '') {
                    alert('请填写影厅名');
                }
                else {
                    this.$store.dispatch({
                        type: 'cinema_updatatingname',
                        id: this.ting_id,
                        tingname: this.updataformLabel.name_ting
                    }),

                        this.$store.dispatch({
                            type: 'cinema_updatachair',
                            id: this.chair_id,
                            newchair: this.updatanewarr
                        }),
                        this.updata_ting = false;//修改影厅及座位成功后关闭窗口
                }

            },

            //修改里面的新增影厅
            addNewting() {
                this.addting = true
                this.updataaddarr = []
            },
            //修改里面的生成座位
            addchair() {
                let arra = []
                for (let i = 0; i < this.addnum1; i++) {
                    let arrrow = []
                    for (let j = 0; j < this.addnum2; j++) {
                        arrrow.push("1")
                    }
                    arra.push(arrrow)
                }
                this.updataaddarr = arra
            },
            //修改里面的生成座位选好座位后保存。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
            saveaddupdata() {
                if (this.addnew.name_ting == '') {
                    alert('请填写影厅名')
                }
                else {
                    this.addting = false
                    this.allsavearr.push({ tingname: this.addnew.name_ting, chair: this.addnewarr1 });
                }
            },


            //修改信息里面的新增
            addchange(hang, lie) {
                this.addnewarr1 = [...this.updataaddarr]
                if (event.target.className == 'chair') {
                    event.target.className = "chairchange"
                    this.updataaddarr[hang][lie] = "0"
                } else {
                    event.target.className = "chair"
                    this.updataaddarr[hang][lie] = "1"
                }
                console.log(this.addnewarr1)
            },


            //---------------------------------------------搜索清空部分----------------------------------------------
            // 搜索
            search() {
                this.isSearch = true
                return this.$store.dispatch({
                    type: 'cinema_search',
                    data: this.input5,
                    select: this.select,
                    page: 1,
                    rows: this.rows
                })
            },
            // 清空
            clear() {
                this.input5 = ""
                return this.$store.dispatch({
                    type: 'cinema_all',
                    page: 1,
                    rows: this.rows
                })
            },
            //----------------------------------------------编辑删除------------------------------------------------------
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 编辑(并打开编辑弹出框)
            handleEdit(index, row) {
                this.allsavearr = []
                this.cinema_id = row._id
                this.updataallmes.name = row.name
                this.updataallmes.address = row.address
                this.updataallmes.phone = row.phone
                this.updataallmes.www = row.www
                this.$store.dispatch({
                    type: 'cinema_sameting',
                    id: row._id
                })
                this.checkboxGroup6 = this.getallcinema[index].special
                // console.log(this.getallcinema[index].special)
                this.updatames = true

            },
            // 删除（）、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、
            handleDelete(index, row) {

                // console.log(row._id);

                // 确认删除
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    this.$store.dispatch({
                        type: 'cinema_del',
                        id: row._id,
                        page: 1,
                        rows: this.rows
                    })
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            //------------------------------------------------新增部分-------------------------------------------
            // 新增影院及院线
            inner() {
                let isOK = true;
                // console.log(this.formLabelAlign);
                for (let key in this.formLabelAlign) {
                    if (this.formLabelAlign[key] == "") {
                        alert("请填写影院信息");
                        this.newchairopen = false;
                        return;
                    }
                }
                if (isOK) {
                    this.newchairopen = true;
                }
            },
            //每次新增时都将以前新增的信息清除（不在保留，以免影响下次新增）
            openouterVisible() {
                this.outerVisible = true
                this.formLabelAlign.name = ''
                this.formLabelAlign.address = ''
                this.formLabelAlign.phone = ''
                this.formLabelAlign.www = ''
                this.newting = []
                this.checkboxGroup5 = []
                // ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
            },
            // 正常新增选座改变状态
            change(hang, lie) {
                this.newarr = [...this.arrchair]
                if (event.target.className == 'chair') {
                    event.target.className = "chairchange"
                    this.arrchair[hang][lie] = "0"
                } else {
                    event.target.className = "chair"
                    this.arrchair[hang][lie] = "1"
                }
                console.log(this.newarr)
            },
            // 生成座位
            proct() {
                let arr = []
                for (let i = 0; i < this.num1; i++) {
                    let arrrow = []
                    for (let j = 0; j < this.num2; j++) {
                        arrrow.push("1")
                    }
                    arr.push(arrrow)
                }
                this.arrchair = arr
                // console.log(this.arrchair, 'sadasd')
            },
            // 保存影厅以及座位
            saveting() {
                if (this.formLabel.name_ting == '') {
                    alert('请填写影厅名');
                }
                else {
                    this.newting.push({ tingname: this.formLabel.name_ting, chair: this.newarr })
                    this.formLabel.name_ting = '';
                    this.num1 = 0;
                    this.num2 = 0;
                    this.newarr = [];
                    this.arrchair = [];
                    this.newchairopen = false;//新增应影厅成功后关闭窗口，后面可继续新增
                }
                console.log(this.formLabel.name_ting);
                console.log(this.newting)
            },
            // 保存影院所有信息(重头戏)
            saveAll() {
                console.log(this.getallTingid, '这里显示idall')
                this.$store.dispatch({
                    type: 'cinema_savechair',
                    data: this.newting,
                    name: this.formLabelAlign.name,
                    address: this.formLabelAlign.address,
                    phone: this.formLabelAlign.phone,
                    www: this.formLabelAlign.www,
                    special: this.checkboxGroup5
                })
                this.$message({
                    message: '新增影院成功',
                    type: 'success'
                });
                this.outerVisible = false;
            }
        }
    }
</script>

<style scoped>
    .wide {
        width: 90px
    }

    .newaddSty {
        width: 200px;
        height: 60px;
        border: 1px solid;
        border-radius: 10px;
        margin: 5px auto;
        text-align: center;
        line-height: 60px
    }

    .new {
        width: 300px;
        /* height: 300px; */
        overflow: auto
    }

    .outboxxian {
        height: 450px;
        border-left: 1px solid;

    }

    .newtingxian {
        display: flex;
        justify-content: space-around
    }

    .chair {

        width: 30px;
        height: 30px;
        background: url(../../../assets/seat_03.png) no-repeat;
        background-size: 100%;
        /* border: 1px solid; */
        margin: 2px;
    }

    .chairchange {

        width: 30px;
        height: 30px;
        background: url(../../../assets/seat_01.png) no-repeat;
        background-size: 100%;
        /* border: 1px solid; */
        margin: 2px;
    }

    img {
        width: 200px;
        height: 20px;
        margin-bottom: 15px
    }

    .img {
        display: flex;
        justify-content: center
    }

    .chairbox {
        display: flex;
        /* flex-wrap: wrap; */
        justify-content: center
    }

    .diagbox {
        /* height: 300px; */
        overflow: auto;
    }

    .el-input {
        width: 90%;

    }

    .input-with-select {
        width: 500px
    }

    h3 {
        padding: 10px 0;
        color: rgb(95, 169, 199)
    }

    .outbox {
        margin-left: 15px
    }

    .tingsty {
        width: 200px;
        height: 60px;
        border: 4px solid;
        margin: 5px auto;
        border-radius: 10px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        position: relative;
    }

    .delsty {
        position: absolute;
        top: -10px;
        right: -10px;
        background: tomato;
        width: 20px;
        border-radius: 50%;
        text-align: center
    }

    .fsSty {
        text-align: center
    }

    .btnsty {
        outline: none;
        border: none;
        border-radius: 3px;
        background: rgb(16, 150, 184)
    }

    .updataadd {
        display: flex;
        justify-content: center
    }

    .centersty {
        display: flex;
        justify-content: center
    }

    .checkedbox {
        display: flex;
        flex-wrap: wrap;
    }

    .el-checkbox:first-child {
        margin-left: 10px
    }

    .el-checkbox {
        margin: 5px 0
    }

    .pageFan {
        display: flex;
        justify-content: center
    }
</style>
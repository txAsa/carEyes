<template>
    <div class='movies'>
        <h3 class="movie_title">电影管理</h3>
        <!-- 管理按钮 -->
        <div class='movie_header'>
            <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
                <el-select v-model="select" slot="prepend" placeholder="请选择">
                    <el-option label="电影名" value="movie_name"></el-option>
                    <el-option label="类型" value="movie_type"></el-option>
                    <el-option label="区域" value="area"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click='searchMovies'></el-button>
            </el-input>
            <el-button type="primary" @click='removeMovies'>刷新</el-button>
            <el-button type="primary" @click='movies_addMovie'>新增</el-button>
        </div>
        <!-- 页面渲染表格 -->
        <el-table :data="movies" border style="width: 100%" @selection-change="handleSelectionChange">

            <el-table-column label="电影名 " width="160">
                <template slot-scope="scope">
                    <span>{{ scope.row.movie_name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="英文电影名" width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.en_name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="类型" width="120">
                <template slot-scope="scope">
                    <span>{{ scope.row.movie_type }}</span>
                </template>
            </el-table-column>
            <el-table-column label="电影维度" width="80">
                <template slot-scope="scope">
                    <span>{{ scope.row.effect }}</span>
                </template>
            </el-table-column>
            <el-table-column label="评分" width="60">
                <template slot-scope="scope">
                    <span>{{ scope.row.movie_soc }}</span>
                </template>
            </el-table-column>
            <el-table-column label="导演" width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.director.name }}({{ scope.row.director.EnName}})</span>
                </template>
            </el-table-column>
            <el-table-column label="演员" width="500">
                <template slot-scope="scope">
                    <span v-for="(item,index) in scope.row.actors" :key="index">{{ item.name }}({{item.EnName}})，</span>
                </template>
            </el-table-column>
            <el-table-column label="想看" width="160">
                <template slot-scope="scope">
                    <span>{{ scope.row.like }}</span>
                </template>
            </el-table-column>
            <el-table-column label="区域" width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.area }}</span>
                </template>
            </el-table-column>
            <el-table-column label="年代" width="60">
                <template slot-scope="scope">
                    <span>{{ scope.row.year }}</span>
                </template>
            </el-table-column>
            <el-table-column label="时长" width="80">
                <template slot-scope="scope">
                    <span>{{ scope.row.movie_time }}</span>
                </template>
            </el-table-column>
            <el-table-column label="上映时间" width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.movie_uptime }}</span>
                </template>
            </el-table-column>
            <el-table-column label="昨日票房排行" width="160">
                <template slot-scope="scope">
                    <span>{{ scope.row.box_office_Y }}</span>
                </template>
            </el-table-column>
            <el-table-column label="首周票房(万)" width="160">
                <template slot-scope="scope">
                    <span>{{ scope.row.box_office_week }}</span>
                </template>
            </el-table-column>
            <el-table-column label="累计票房(万)" width="160">
                <template slot-scope="scope">
                    <span>{{ scope.row.box_office_all }}</span>
                </template>
            </el-table-column>
            <el-table-column label="简介" width="1600">
                <template slot-scope="scope">
                    <span>{{ scope.row.info }}</span>
                </template>
            </el-table-column>
            <el-table-column label="电影图片" width="200">
                <template slot-scope="scope">
                    <span>{{ scope.row.movie_img }}</span>
                </template>
            </el-table-column>

            <el-table-column label="剧照图片" width="1000">
                <template slot-scope="scope">
                    <span>{{ scope.row.img_box }}</span>
                </template>
            </el-table-column>
            <el-table-column label="预告片" width="200">
                <template slot-scope="scope">
                    <span>{{ scope.row.video }}</span>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="150">
                <template slot-scope="scope">
                    <el-button size="mini" @click="moviesEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="moviesDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 翻页 -->
        <el-pagination background layout="prev, pager,next" :total="total" @current-change='current_change' :page-size="rows">
        </el-pagination>
        <!-- 增加弹窗 -->
        <el-dialog title="增加电影" :visible.sync="addDialog" width="45%" center>
            <el-form>
                <el-form-item label="电影名:">
                    <el-input v-model="addData.movie_name" placeholder="请输入电影名" style="margin:10px"></el-input>
                </el-form-item>

                <el-form-item label="英文电影名:">
                    <el-input v-model="addData.en_name" placeholder="请输入电影英文名" style="margin:10px"></el-input>
                </el-form-item>

                <el-form-item label="电影类型:">
                    <el-input v-model="addData.movie_type" placeholder="如：爱情,动作..." style="margin:10px"></el-input>
                </el-form-item>

                <el-form-item label="电影维度:">
                    <el-input v-model="addData.effect" placeholder="3D,IMAX..." style="margin:10px"></el-input>
                </el-form-item>

                <el-form-item label="区域:">
                    <el-input v-model="addData.area" placeholder="请输入电影国家" style="margin:10px"></el-input>
                </el-form-item>

                <el-form-item label="上映时间:">
                    <el-input v-model="addData.movie_uptime" placeholder="请输入上映时间" style="margin:10px"></el-input>
                </el-form-item>

                <el-form-item label="年代:">
                    <el-input v-model="addData.year" placeholder="请输入年代" style="margin:10px"></el-input>
                </el-form-item>

                <el-form-item label="电影时长:">
                    <el-input v-model="addData.movie_time" placeholder="请输入电影总时长 如：120" style="margin:10px"></el-input>
                </el-form-item>

                <el-form-item label="电影评分:">
                    <el-input v-model="addData.movie_soc" placeholder="请输入电影评分" style="margin:10px"></el-input>
                </el-form-item>

                <el-form-item label="昨日票房排行:">
                    <el-input v-model="addData.box_office_Y" placeholder="请输入昨日票房排行" style="margin:10px"></el-input>
                </el-form-item>

                <el-form-item label="首周票房(万):">
                    <el-input v-model="addData.box_office_week" placeholder="请输入首周票房(万)" style="margin:10px"></el-input>
                </el-form-item>

                <el-form-item label="累计票房(万):">
                    <el-input v-model="addData.box_office_all" placeholder="请输入累计票房(万)" style="margin:10px"></el-input>
                </el-form-item>

                <el-form-item label="想看人数:">
                    <el-input v-model="addData.like" placeholder="请输入想看人数" style="margin:10px"></el-input>
                </el-form-item>

                <el-form-item label="电影简介:">
                    <el-input v-model="addData.info" placeholder="请输入电影简介" style="margin:10px"></el-input>
                </el-form-item>

                <el-form-item label="电影图片:">
                    <el-upload class="upload-demo" ref="upload" :action="IP+'movies/movies_add_headimg'" :on-success="add_img_success" :file-list="fileList">
                        <el-button slot="trigger" size="small" type="primary">选取封面图</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传一张照片，不然则会被覆盖</div>
                    </el-upload>
                </el-form-item>

                <el-form-item label="电影导演:">
                    <el-input v-model="director.name" placeholder="请输入电影导演" style="margin:10px"></el-input>
                </el-form-item>

                <el-form-item label="导演英文名:">
                    <el-input v-model="director.EnName" placeholder="请输入导演英文名" style="margin:10px"></el-input>
                </el-form-item>

                <el-form-item label="导演照片:">
                    <el-upload class="upload-demo" ref="upload" :action="IP+'movies/movies_add_director_img'" :on-success="add_director_success"
                        :file-list="fileList">
                        <el-button slot="trigger" size="small" type="primary">选取导演照片</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传一张照片，不然则会被覆盖</div>
                    </el-upload>
                </el-form-item>

                <div v-for="(item,index) in actors" :key="index">
                    <el-form-item label="电影演员:">
                        <el-input v-model="allActor[index].name" placeholder="请输入电影演员" style="margin:10px"></el-input>
                    </el-form-item>

                    <el-form-item label="演员英文名:">
                        <el-input v-model="allActor[index].EnName" placeholder="请输入演员英文名" style="margin:10px"></el-input>
                    </el-form-item>

                    <el-form-item label="饰演角色:">
                        <el-input v-model="allActor[index].portray" placeholder="请输入演员角色名" style="margin:10px"></el-input>
                    </el-form-item>

                    <el-form-item label="演员照片:">

                        <el-upload class="upload-demo" ref="upload" :action="IP+'movies/movies_add_actors_img'" :on-success="add_actors_success"
                            :file-list="fileList">
                            <el-button slot="trigger" size="small" type="primary">选择演员照片</el-button>
                        </el-upload>
                    </el-form-item>
                </div>
                <el-button type="success" plain @click="addActors" id="addActors">添加更多相关演员</el-button>
                <p v-if="show" class="red">最多只能添加5个演员信息</p>

                <el-form-item label="宣传视频:">
                    <el-upload class="upload-demo" ref="upload" :action="IP+'movies/movies_add_video'" :on-success="add_video_success" :file-list="fileList">
                        <el-button slot="trigger" size="small" type="primary">选取视频</el-button>
                    </el-upload>
                </el-form-item>


                <el-form-item label="电影剧照:">
                    <el-upload class="upload-demo" ref="upload" :action="IP+'movies/movies_add_imgbox'" :on-success="add_imgbox_success" :file-list="fileList"
                        multiple>
                        <el-button slot="trigger" size="small" type="primary">选取剧照</el-button>
                    </el-upload>
                </el-form-item>

            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="addMovies">确 定</el-button>
                <el-button @click="recancelAdd_M">取 消</el-button>
            </span>
        </el-dialog>
        <!-- 修改弹窗 -->
        <el-dialog title="修改电影" :visible.sync="upDialog" width="45%" center>
            <el-form>
                <el-form-item label="电影名:">
                    <el-input v-model="upData.movie_name" placeholder="请输入电影名" style="margin:10px"></el-input>
                </el-form-item>

                <el-form-item label="电影英文名:">
                    <el-input v-model="upData.en_name" placeholder="请输入电影英文名" style="margin:10px"></el-input>
                </el-form-item>

                <el-form-item label="电影类型:">
                    <el-input v-model="upData.movie_type" placeholder="如：爱情,动作..." style="margin:10px"></el-input>
                </el-form-item>

                <el-form-item label="电影维度:">
                    <el-input v-model="upData.effect" placeholder="3D,IMAX..." style="margin:10px"></el-input>
                </el-form-item>

                <el-form-item label="电影国家:">
                    <el-input v-model="upData.area" placeholder="请输入电影国家" style="margin:10px"></el-input>
                </el-form-item>

                <el-form-item label="上映时间:">
                    <el-input v-model="upData.movie_uptime" placeholder="请输入上映时间" style="margin:10px"></el-input>
                </el-form-item>
                <el-form-item label="昨日票房排行:">
                    <el-input v-model="upData.box_office_Y" placeholder="请输入昨日票房排行" style="margin:10px"></el-input>
                </el-form-item>
                <el-form-item label="首周票房(万):">
                    <el-input v-model="upData.box_office_week" placeholder="请输入首周票房" style="margin:10px"></el-input>
                </el-form-item>
                <el-form-item label="累计票房(万):">
                    <el-input v-model="upData.box_office_all" placeholder="请输入累计票房" style="margin:10px"></el-input>
                </el-form-item>

                <el-form-item label="电影时长:">
                    <el-input v-model="upData.movie_time" placeholder="请输入电影总时长" style="margin:10px"></el-input>
                </el-form-item>

                <el-form-item label="电影评分:">
                    <el-input v-model="upData.movie_soc" placeholder="请输入电影评分" style="margin:10px"></el-input>
                </el-form-item>

                <el-form-item label="想看人数:">
                    <el-input v-model="upData.like" placeholder="请输入电影评分" style="margin:10px"></el-input>
                </el-form-item>

                <el-form-item label="电影简介:">
                    <el-input v-model="upData.info" placeholder="请输入电影简介" style="margin:10px"></el-input>
                </el-form-item>

                <el-form-item label="电影首图:">
                    <el-upload class="upload-demo" ref="upload" :action="IP+'movies/movies_add_headimg'" :on-success="up_head_success" :file-list="fileList">
                        <el-button slot="trigger" size="small" type="primary">是否重新上传电影首图</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传一张照片，不然则会被覆盖</div>
                    </el-upload>
                </el-form-item>

                <el-form-item label="电影导演:">
                    <el-input v-model="director.name" placeholder="请输入电影导演" style="margin:10px"></el-input>
                </el-form-item>

                <el-form-item label="导演英文名:">
                    <el-input v-model="director.EnName" placeholder="请输入电影导演英文名" style="margin:10px"></el-input>
                </el-form-item>

                <el-form-item label="导演照片:">
                    <el-upload class="upload-demo" ref="upload" :action="IP+'movies/movies_add_director_img'" :on-success="add_director_success"
                        :file-list="fileList">
                        <el-button slot="trigger" size="small" type="primary">是否重新上传导演照片</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传一张照片，不然则会被覆盖</div>
                    </el-upload>
                </el-form-item>

                <div v-for="(item,index) in upActors" :key="index">
                    <el-form-item label="电影演员:">
                        <el-input v-model="upActors[index].name" placeholder="请输入电影演员" style="margin:10px"></el-input>
                    </el-form-item>
                    <el-form-item label="演员英文名:">
                        <el-input v-model="upActors[index].EnName" placeholder="请输入演员角色名" style="margin:10px"></el-input>
                    </el-form-item>

                    <el-form-item label="饰演角色:">
                        <el-input v-model="upActors[index].portray" placeholder="请输入演员角色名" style="margin:10px"></el-input>
                    </el-form-item>
                    <div @click="up_actor_click(index)">
                        <el-form-item label="演员照片:">
                            <el-upload class="upload-demo" ref="upload" :action="IP+'movies/movies_add_actors_img'" :on-success="up_actors_success" :file-list="fileList">
                                <el-button slot="trigger" size="small" type="primary">是否重新选择演员照片</el-button>
                            </el-upload>
                        </el-form-item>
                    </div>
                </div>

                <el-form-item label="宣传视频:">
                    <el-upload class="upload-demo" ref="upload" :action="IP+'movies/movies_add_video'" :on-success="up_video_success" :file-list="fileList">
                        <el-button slot="trigger" size="small" type="primary">重新上传视频</el-button>
                    </el-upload>
                </el-form-item>

                <el-form-item label="电影剧照:">
                    <el-upload class="upload-demo" ref="upload" :action="IP+'movies/movies_add_imgbox'" :before-upload='up_imgbox_before' :on-success="up_imgbox_success"
                        :file-list="fileList" multiple>
                        <el-button slot="trigger" size="small" type="primary">重新上传剧照</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="电影剧照:">
                    <el-upload class="upload-demo" ref="upload" :action="IP+'movies/movies_add_imgbox'" :on-success="up_imgbox_success" :file-list="fileList"
                        multiple>
                        <el-button slot="trigger" size="small" type="primary">点击增加更多剧照</el-button>
                    </el-upload>

                </el-form-item>

            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="upMovies">确 定</el-button>
                <el-button @click="upDialog = false">取 消</el-button>
            </span>
        </el-dialog>
        <!-- 删除弹窗 -->
        <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
            <span>是否确认删除？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="movies_Delete">确 定</el-button>
                <el-button @click="centerDialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                rows: 6,
                input5: '',
                select: '',
                //默认第一页
                val: 1,
                fileList: [],
                //打开添加先关演员按钮
                actors: [0],
                //演员合集
                allActor: [
                    {
                        name: "",
                        EnName: "",
                        img: "",
                        portray: ""
                    }
                ],
                //导演资料
                director: {
                    name: "",
                    EnName: "",
                    img: "",
                    position: "导演"
                },
                //剧照
                img_box: [],
                //默认第一页
                val: 1,
                //删除弹窗
                centerDialogVisible: false,
                //增加弹窗
                addDialog: false,
                //修改弹窗
                upDialog: false,
                //增加数据
                addData: {},
                //搜索
                search: "",
                select: "movie_name",
                isSreach: false,
                //点击
                isOk: true,
                show: false,
                index: 0,
                //修改
                upData: {},
                //修改演员
                upActors: [],
                //修改演员照片索引
                actorIndex: 0
            }
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //初始化电影数据
            refreshMovies(page, rows) {
                if (this.isSreach) {
                    this.$store.dispatch({
                        type: "movies_searchMovies",
                        name: this.select,
                        text: this.search,
                        page,
                        rows
                    });
                } else {
                    this.$store.dispatch({
                        type: 'refreshMovies',
                        page,
                        rows
                    })
                }
            },
            //--------------------------------------------新增----------------------
            //新增电影
            movies_addMovie() {
                this.addDialog = true;
            },
            //增加电影图片
            add_img_success(data) {
                console.log(data)
                this.addData.movie_img = data;
            },
            //增加导演图
            add_director_success(data) {
                this.director.img = data;
            },
            //增加演员照片
            add_actors_success(data) {
                if (this.allActor.length == 1) {
                    this.allActor.img = data;
                } else {
                    this.allActor[this.index].img = data;
                }
            },
            //增加视频
            add_video_success(data) {
                this.addData.video = data;

            },
            //增加剧照
            add_imgbox_success(data) {
                this.img_box.push(data);
            },
            //打开添加相关演员按钮
            addActors() {
                this.actors.push(0);
                this.index++;
                if (this.actors.length <= 6) {
                    var item = {
                        name: "",
                        EnName: "",
                        img: "",
                        portray: ""
                    };
                    this.allActor.push(item);
                } else {
                    this.actors.pop();
                    this.show = true;
                }

            },
            //确认添加电影
            addMovies(formName) {
                this.addData.director = this.director;
                this.addData.actors = this.allActor;
                this.addData.img_box = this.img_box;
                this.$store.dispatch({
                    type: "addMovies",
                    data: this.addData,
                    page: this.val,
                    rows: this.rows,
                });
                this.refreshMovies(this.val, this.rows);
                //    this.$refs[formName].resetFields();//此方法需要模态框加载完成后才可以执行
                //重置表单
                this.reset();
                this.addDialog = false;
            },
            //取消新增电影
            recancelAdd_M() {
                this.addDialog = false;
                this.reset();
            },
            //--------------------------------------修改----------------------------------
            //修改电影首图
            up_head_success(data) {
                this.upData.movie_img = data;
            },
            //修改演员照片
            up_actor_click(index) {
                this.actorIndex = index;
            },
            up_actors_success(data) {
                this.allActor[this.actorIndex].img = data;
            },
            //修改剧照
            up_video_success(data) {
                this.upData.video = data;
            },
            //修改剧照
            up_imgbox_before() {
                this.img_box = [];
            },
            //修改电影剧照
            up_imgbox_success(data) {
                this.img_box.push(data);
            },
            //修改电影弹窗 
            moviesEdit(index, rows) {
                this.upDialog = true;
                this.upData.movie_name = rows.movie_name;
                this.upData.en_name = rows.en_name;
                this.upData.movie_type = rows.movie_type;
                this.upData.effect = rows.effect;
                this.upData.area = rows.area;
                this.upData.box_office_Y = rows.box_office_Y;
                this.upData.box_office_week = rows.box_office_week;
                this.upData.box_office_all = rows.box_office_all;
                this.allActor = rows.actors;
                this.upData.movie_uptime = rows.movie_uptime;
                this.upData.movie_time = rows.movie_time;
                this.upData.movie_soc = rows.movie_soc;
                this.upData.like = rows.like;
                this.upData.info = rows.info;
                this.director = rows.director;
                this.img_box = rows.img_box;
                this.upActors = rows.actors;
                this.upData._id = rows._id;
            },
            //修改电影
            upMovies() {
                this.upData.director = this.director;
                this.upData.actors = this.allActor;
                this.upData.img_box = this.img_box;
                // this.upData.comment = [];
                this.$store.dispatch({
                    type: "upMovies",
                    data: this.upData,
                });
                this.refreshMovies(this.val, this.rows)
                this.reset();
                this.upDialog = false;
            },
            //删除电影
            moviesDelete(index, row) {
                this.centerDialogVisible = true;
                this._id = row._id;
                this.refreshMovies(this.val, this.rows);
            },
            //确认删除
            movies_Delete() {
                this.$store.dispatch({
                    type: "movies_Delete",
                    id: this._id,
                    page: this.val,
                    rows: this.rows
                });
                this.refreshMovies(this.val, this.rows);
                this.centerDialogVisible = false;
            },
            //搜索
            searchMovies() {
                this.isSreach = true;
                this.$store.dispatch({
                    type: "movies_searchMovies",
                    name: this.select,
                    text: this.search,
                    page: this.val,
                    rows: this.rows,
                });
            },
            //清除查询
            removeMovies() {
                this.isSreach = false;
                this.search = '';
                this.select = "movie_name";
                this.refreshMovies(1, this.rows);
            },
            //翻页
            current_change(val) {
                this.val = val;
                this.refreshMovies(this.val, this.rows);
            },
            //重置表单
            reset() {
                this.addData = {};
                this.upData = {};
                this.upActors = [];
                this.img_box = [];
                (this.director = { name: "", img: "", position: "导演" }),
                    (this.actors = [0]);
                this.index = 0;
                (this.allActor = [{ name: "", EnName: "", portray: "" }]), (this.fileList = []);
            }
        },
        computed: {
            //IP
            IP() {
                return this.$store.state.movie.IP;
            },
            //使用电影的数据
            movies() {
                return this.$store.state.movie.movies;
            },
            //总数据条数
            total() {
                return this.$store.state.movie.total;
            }
        },
        created() {
            this.refreshMovies(this.val, this.rows);
        }
    }
</script>

<style>
    .movies {
        padding: 0 20px;
    }

    .movies .el-main[data-v-3bede10a] {
        text-align: left;
        line-height: 0;
    }

    .movies>.movie_header>.el-input {
        width: 500px;
    }

    .movies .el-select {
        width: 130px;
    }

    .movies .movie_title {
        color: rgb(74, 194, 235);
        padding: 10px 0;
    }

    .movies .el-table {
        margin-top: 20px;
    }
</style>
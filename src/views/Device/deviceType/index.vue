<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-03 20:13:09
 * @LastEditors: sj
 * @LastEditTime: 2022-08-03 20:14:17
-->
<template>
  <div class="app-main">
    <!-- 头部搜索框 -->
    <d-search nameOne="型号搜索" @search="searchFn" />
    <!-- table -->
    <el-card class="box-card">
      <div class="result">
        <div class="operation-btn">
          <!-- 点击新建按钮触发的事件 clickAddBtn -->
          <!-- 点击第二个按钮触发的事件  clickSecondBtn-->
          <my-buttom
            bcColor="orange"
            icon="el-icon-circle-plus-outline"
            @click.native="clickAddBtn('新增设备类型')"
            >新建</my-buttom
          >
        </div>
        <!-- 列表 -->
        <div class="result-list">
          <el-table
            :data="tableData"
            style="width: 100%"
            row-key="String"
            ref="table"
            v-loading="loading"
          >
            <!-- 序号列 -->
            <el-table-column
              prop="itemIndex"
              label="序号"
              width="80"
            ></el-table-column>
            <el-table-column
              prop="name"
              label="型号名称"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              prop="model"
              label="型号编码"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              prop="image"
              label="设备图片"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <div class="block">
                  <el-image
                    style="width: 24px; height: 24px"
                    :src="scope.row.image"
                    round
                    fit="fit"
                  ></el-image>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="vmRow"
              label="货道行"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              prop="vmCol"
              label="货道列"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="channelMaxCapacity"
              label="设备容量"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <!-- 操作列 -->
            <el-table-column fixed="right" label="操作" prop="taskId">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  @click="handleClick(scope.row, '操作')"
                  size="medium"
                  class="operationBtn"
                  style="margin-right: 20px"
                  >操作
                </el-button>
                <el-button
                  type="text"
                  @click="handleClick(scope.row, '删除')"
                  size="medium"
                  class="operationBtn color"
                  >删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- 分页 -->
          <!-- $attrs 祖孙传值  $listeners 方法-->
          <my-pagination
            :totalPage="totalPage"
            :totalCount="totalCount"
            :pageIndex="pageIndex"
            @upPage="upPage"
            @nextPage="nextPage"
          ></my-pagination>
        </div>
      </div>
    </el-card>
    <!-- 新增设备类型弹出框 -->
    <d-dialog
      :dialogTitle="dialogTitle"
      :dialogVisible="equipmentShow"
      @close="closeDialog"
    >
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="80px"
        :rules="rules"
        class="demo-ruleForm"
      >
        <el-form-item label="型号名称" prop="name">
          <el-input
            v-model="ruleForm.name"
            size="medium"
            placeholder="请输入"
            maxlength="10"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="型号编码" prop="model">
          <el-input
            v-model="ruleForm.model"
            size="medium"
            maxlength="15"
            show-word-limit
            placeholder="请输入（限制数字、字母、中划线、下划线）"
          ></el-input>
        </el-form-item>
        <el-form-item label="货道行数" prop="vmRow">
          <el-input-number
            v-model="ruleForm.vmRow"
            controls-position="right"
            :min="1"
            :max="10"
            placeholder="请输入"
            size="medium"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="货道列数" prop="vmCol">
          <el-input-number
            v-model="ruleForm.vmCol"
            controls-position="right"
            :min="1"
            :max="10"
            size="medium"
            placeholder="请输入"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="货道容量" prop="channelMaxCapacity">
          <el-input-number
            v-model="ruleForm.channelMaxCapacity"
            controls-position="right"
            :min="1"
            size="medium"
            :max="10"
            placeholder="请输入"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="设备图片" prop="image">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :http-request="uploadImage"
          >
            <img v-if="ruleForm.image" :src="ruleForm.image" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="margin: 0; position: relative; top: -8px">
            支持扩展名: jpg、png,文件不得大于100kb
          </p>
        </el-form-item>
      </el-form>
      <div class="footer-btn">
        <my-buttom bcColor="lightsalmon" @click.native="closeDialog"
          >取消</my-buttom
        >
        <my-buttom bcColor="orange" @click.native="addVmType">确认</my-buttom>
      </div>
    </d-dialog>
  </div>
</template>

<script>
import DSearch from "@/components/Search.vue";
import DResultList from "@/components/ResultList.vue";
import MyButtom from "@/components/Button.vue";
import MyPagination from "@/components/Pagination.vue";
import DDialog from "@/components/Dialog.vue";
import {
  getTypeList,
  imgUpload,
  addVmType,
  changeVmType,
  delVmType,
} from "@/api/vm";
export default {
  components: {
    DSearch,
    DResultList,
    MyButtom,
    MyPagination,
    DDialog,
  },

  data() {
    const repeatName = (rule, value, callback) => {
      let flag;
      if (this.dialogTitle === "新增设备类型") {
        // flag = this.tableData.some((ele) => ele.name === value);
      }
      if (this.dialogTitle === "修改设备类型") {
        let filter = this.changeName;
        flag = this.tableData
          .filter((ele) => ele.name !== filter)
          .some((ele) => ele.name === value);
      }
      flag ? callback(new Error("型号名称重复")) : callback();
    };
    const repeatModel = (rule, value, callback) => {
      let flag;
      if (this.dialogTitle === "新增设备类型") {
        flag = this.tableData.some((ele) => ele.model === value);
      }
      if (this.dialogTitle === "修改设备类型") {
        let filter = this.changeModel;
        flag = this.tableData
          .filter((ele) => ele.model !== filter)
          .some((ele) => ele.model === value);
      }
      flag ? callback(new Error("型号编码重复")) : callback();
    };
    return {
      searchParams: {}, // 搜索数据
      searchList: [], // table渲染列表（根据搜索获得）
      tableData: [], //table 渲染数据
      pageIndex: "", // 当前页数
      totalPage: "", //  总页数
      totalCount: "", // 总共多少条记录
      loading: false, // 控制加载
      equipmentShow: false, // 新增设备类型弹出框控制
      dialogTitle: "新增设备类型", // 弹框标头
      // 弹框表单数据
      ruleForm: {
        name: "",
        model: "",
        vmRow: null,
        vmCol: null,
        channelMaxCapacity: null,
        image: "", // 图片路径
      },
      // 校验规则
      rules: {
        name: [
          { required: true, message: "请输入", trigger: "blur" },
          { validator: repeatName, trigger: "blur" },
        ],
        model: [
          { required: true, message: "请输入", trigger: "blur" },
          {
            pattern: /^[A-Za-z0-9_-]+$/,
            message: "请输入合法的型号编码",
            trigger: "blur",
          },
          { validator: repeatModel, tiggers: "blur" },
        ],
        vmRow: [{ required: true, message: "请选择", trigger: "blur" }],
        vmCol: [{ required: true, message: "请选择", trigger: "blur" }],
        channelMaxCapacity: [
          { required: true, message: "请选择", trigger: "blur" },
        ],
        image: [{ required: true, message: "请上传图片", trigger: "blur" }],
      },
      changeName: "", // 为了修改时校验
      changeModel: "", // 为了修改时校验
    };
  },

  created() {
    this.getTypeList(this.searchParams);
  },

  methods: {
    // 获取渲染列表
    async getTypeList(data) {
      this.loading = true;
      const res = await getTypeList(data);
      this.pageIndex = res.pageIndex;
      this.totalPage = res.totalPage;
      this.totalCount = res.totalCount;
      this.changeTableData(res.currentPageRecords);
      this.loading = false;
    },
    // 更改数据
    changeTableData(arr) {
      let arr1 = arr;
      arr1.forEach((ele, index) => {
        ele.itemIndex = (this.pageIndex - 1) * 10 + index + 1;
        this.tableData = arr1;
      });
    },
    // 点击操作按钮
    async handleClick(row, val) {
      if (val === "操作") {
        this.dialogTitle = "修改设备类型";
        this.equipmentShow = true;
        this.ruleForm = {
          name: row.name,
          model: row.model,
          vmRow: row.vmRow,
          vmCol: row.vmCol,
          channelMaxCapacity: row.channelMaxCapacity,
          image: row.image, // 图片路径
          typeId: row.typeId,
        };
        this.changeName = row.name;
        this.changeModel = row.model;
      }
      if (val === "删除") {
        await delVmType(row.typeId);
        this.getTypeList(this.searchParams);
      }
      // console.log(row);

      // 点击哪个按钮就把 当前这一列的信息 和 按钮的内容 val 传到父组件通过接收到的值触发不同处理函数，
    },
    // 点击上一页
    upPage() {
      this.getTypeList({
        pageIndex: --this.pageIndex,
        pageSize: 10,
        isRepair: false,
      });
    },
    // 点击下一页
    nextPage() {
      this.getTypeList({
        pageIndex: ++this.pageIndex,
        pageSize: 10,
        isRepair: false,
      });
    },
    // 搜索功能
    searchFn(val) {
      this.getTypeList({ name: val });
    },
    // 点击新增按钮
    clickAddBtn() {
      this.equipmentShow = true;
      this.dialogTitle = "新增设备类型";
    },
    // 上传头像
    async uploadImage(file) {
      // console.log(file);
      this.ruleForm.image = await imgUpload(file.file);
      this.$message.success("头像上传成功");
    },
    beforeAvatarUpload(file) {
      // console.log(file);
      const isJPG = file.type === "image/jpeg" || "image/png";
      const isLt100KB = file.size / 1024 / 100;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt100KB) {
        this.$message.error("上传头像图片大小不能超过 100KB!");
      }
      return isJPG && isLt100KB;
    },
    //关闭弹框
    closeDialog() {
      this.equipmentShow = false;
      this.$refs.ruleForm.resetFields();
      this.ruleForm = {
        name: "",
        model: "",
        vmRow: "",
        vmCol: "",
        channelMaxCapacity: "",
        image: "", // 图片路径
      };
    },
    // 弹框确认
    async addVmType() {
      try {
        if (this.dialogTitle === "新增设备类型") {
          await addVmType(this.ruleForm);
          this.getTypeList(this.searchParams);
          this.closeDialog();
        }
        if (this.dialogTitle === "修改设备类型") {
          const res = await changeVmType(this.ruleForm);
          console.log(res);
          this.getTypeList(this.searchParams);
          this.closeDialog();
        }
      } catch (error) {}
    },
  },
};
</script>

<style lang="scss" scoped>
.color {
  color: red;
}
.operationBtn {
  margin-left: 0px !important;
}
.result {
  padding: 20px 15px 19px 17px;
  background-color: #fff;

  .operation-btn {
    margin-bottom: 20px;
  }
  ::v-deep .el-table th.is-leaf {
    line-height: 1.15;
    padding: 10px 0px 9px;
    background: rgb(243, 246, 251);
    font-weight: 500;
    text-align: left;
    color: rgb(102, 102, 102);
    border-bottom: 0;
  }
  .pagination {
    display: flex;
    justify-content: space-between;
    background: #fff;
    padding: 32px 16px;
    span {
      flex: 1;
      font-size: 16px !important;
      color: #dbdfe5 !important;
    }

    .pageBtn {
      width: 70px;
      height: 32px;
      margin: 0 16px;
      border-radius: 2px;
      background-color: #d5ddf8;
    }
  }
}

::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
::v-deep .avatar-uploader .el-upload:hover {
  border-color: #409eff !important;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 84px;
  height: 84px;
  line-height: 84px;
  text-align: center;
  background: #f3f6fb;
}
.avatar {
  width: 84px;
  height: 84px;
  display: block;
}
.el-input-number {
  width: 100%;
}
.el-form-item {
  margin-bottom: 20px;
}
::v-deep .el-form-item__label {
  height: 36px;
  line-height: 36px;
}
.footer-btn {
  width: 100%;
  text-align: center;
  position: relative;
  top: -15px;
}
</style>

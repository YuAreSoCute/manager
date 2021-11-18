<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="I机构d" prop="parentId">
        <el-input
          v-model="queryParams.parentId"
          placeholder="请输入I机构d"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户名" prop="mailUser">
        <el-input
          v-model="queryParams.mailUser"
          placeholder="请输入用户名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="密码" prop="mailPwd">
        <el-input
          v-model="queryParams.mailPwd"
          placeholder="请输入密码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="端口" prop="mailPort">
        <el-input
          v-model="queryParams.mailPort"
          placeholder="请输入端口"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="邮箱类型(0系统邮箱 1流程人员邮箱)" prop="mailType">
        <el-select v-model="queryParams.mailType" placeholder="请选择邮箱类型(0系统邮箱 1流程人员邮箱)" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否设为默认邮箱 (0默认 1非默认)" prop="mailDefault">
        <el-input
          v-model="queryParams.mailDefault"
          placeholder="请输入是否设为默认邮箱 (0默认 1非默认)"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="备注" prop="mailRemark">
        <el-input
          v-model="queryParams.mailRemark"
          placeholder="请输入备注"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="服务器地址" prop="serverAddress">
        <el-input
          v-model="queryParams.serverAddress"
          placeholder="请输入服务器地址"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="备用字段1" prop="bk1Mail">
        <el-input
          v-model="queryParams.bk1Mail"
          placeholder="请输入备用字段1"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="备用字段2" prop="bk2Mail">
        <el-input
          v-model="queryParams.bk2Mail"
          placeholder="请输入备用字段2"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="备用字段3" prop="bk3Mail">
        <el-input
          v-model="queryParams.bk3Mail"
          placeholder="请输入备用字段3"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="备用字段4" prop="bk4Mail">
        <el-input
          v-model="queryParams.bk4Mail"
          placeholder="请输入备用字段4"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['manager:mail:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['manager:mail:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['manager:mail:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          :loading="exportLoading"
          @click="handleExport"
          v-hasPermi="['manager:mail:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="mailList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="邮箱Id" align="center" prop="mailId" />
      <el-table-column label="I机构d" align="center" prop="parentId" />
      <el-table-column label="用户名" align="center" prop="mailUser" />
      <el-table-column label="密码" align="center" prop="mailPwd" />
      <el-table-column label="端口" align="center" prop="mailPort" />
      <el-table-column label="邮箱类型(0系统邮箱 1流程人员邮箱)" align="center" prop="mailType" />
      <el-table-column label="是否设为默认邮箱 (0默认 1非默认)" align="center" prop="mailDefault" />
      <el-table-column label="备注" align="center" prop="mailRemark" />
      <el-table-column label="服务器地址" align="center" prop="serverAddress" />
      <el-table-column label="备用字段1" align="center" prop="bk1Mail" />
      <el-table-column label="备用字段2" align="center" prop="bk2Mail" />
      <el-table-column label="备用字段3" align="center" prop="bk3Mail" />
      <el-table-column label="备用字段4" align="center" prop="bk4Mail" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['manager:mail:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['manager:mail:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改mail对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="I机构d" prop="parentId">
          <el-input v-model="form.parentId" placeholder="请输入I机构d" />
        </el-form-item>
        <el-form-item label="用户名" prop="mailUser">
          <el-input v-model="form.mailUser" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="mailPwd">
          <el-input v-model="form.mailPwd" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="端口" prop="mailPort">
          <el-input v-model="form.mailPort" placeholder="请输入端口" />
        </el-form-item>
        <el-form-item label="邮箱类型(0系统邮箱 1流程人员邮箱)" prop="mailType">
          <el-select v-model="form.mailType" placeholder="请选择邮箱类型(0系统邮箱 1流程人员邮箱)">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="是否设为默认邮箱 (0默认 1非默认)" prop="mailDefault">
          <el-input v-model="form.mailDefault" placeholder="请输入是否设为默认邮箱 (0默认 1非默认)" />
        </el-form-item>
        <el-form-item label="备注" prop="mailRemark">
          <el-input v-model="form.mailRemark" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="服务器地址" prop="serverAddress">
          <el-input v-model="form.serverAddress" placeholder="请输入服务器地址" />
        </el-form-item>
        <el-form-item label="备用字段1" prop="bk1Mail">
          <el-input v-model="form.bk1Mail" placeholder="请输入备用字段1" />
        </el-form-item>
        <el-form-item label="备用字段2" prop="bk2Mail">
          <el-input v-model="form.bk2Mail" placeholder="请输入备用字段2" />
        </el-form-item>
        <el-form-item label="备用字段3" prop="bk3Mail">
          <el-input v-model="form.bk3Mail" placeholder="请输入备用字段3" />
        </el-form-item>
        <el-form-item label="备用字段4" prop="bk4Mail">
          <el-input v-model="form.bk4Mail" placeholder="请输入备用字段4" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listMail, getMail, delMail, addMail, updateMail, exportMail } from "@/api/manager/mail";

export default {
  name: "Mail",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 导出遮罩层
      exportLoading: false,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // mail表格数据
      mailList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        parentId: null,
        mailUser: null,
        mailPwd: null,
        mailPort: null,
        mailType: null,
        mailDefault: null,
        mailRemark: null,
        serverAddress: null,
        bk1Mail: null,
        bk2Mail: null,
        bk3Mail: null,
        bk4Mail: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        mailUser: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        mailPwd: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        mailPort: [
          { required: true, message: "端口不能为空", trigger: "blur" }
        ],
        serverAddress: [
          { required: true, message: "服务器地址不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询mail列表 */
    getList() {
      this.loading = true;
      listMail(this.queryParams).then(response => {
        this.mailList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        mailId: null,
        parentId: null,
        mailUser: null,
        mailPwd: null,
        mailPort: null,
        mailType: null,
        mailDefault: null,
        mailRemark: null,
        serverAddress: null,
        bk1Mail: null,
        bk2Mail: null,
        bk3Mail: null,
        bk4Mail: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.mailId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加mail";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const mailId = row.mailId || this.ids
      getMail(mailId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改mail";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.mailId != null) {
            updateMail(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addMail(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const mailIds = row.mailId || this.ids;
      this.$confirm('是否确认删除mail编号为"' + mailIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delMail(mailIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有mail数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportMail(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>

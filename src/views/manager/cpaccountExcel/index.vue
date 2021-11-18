<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="用户ID" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入用户ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="机构ID" prop="parentId">
        <el-input
          v-model="queryParams.parentId"
          placeholder="请输入机构ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="国知局账号" prop="account">
        <el-input
          v-model="queryParams.account"
          placeholder="请输入国知局账号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="国知局密码" prop="password">
        <el-input
          v-model="queryParams.password"
          placeholder="请输入国知局密码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="机构名称" prop="companyName">
        <el-input
          v-model="queryParams.companyName"
          placeholder="请输入机构名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="fastdfs 上传链接" prop="dfsUpUrl">
        <el-input
          v-model="queryParams.dfsUpUrl"
          placeholder="请输入fastdfs 上传链接"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="fastdfs 下载链接" prop="dfsDnUrl">
        <el-input
          v-model="queryParams.dfsDnUrl"
          placeholder="请输入fastdfs 下载链接"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="未知" prop="tag">
        <el-input
          v-model="queryParams.tag"
          placeholder="请输入未知"
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
          v-hasPermi="['manager:cpaccountExcel:add']"
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
          v-hasPermi="['manager:cpaccountExcel:edit']"
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
          v-hasPermi="['manager:cpaccountExcel:remove']"
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
          v-hasPermi="['manager:cpaccountExcel:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="cpaccountExcelList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="国知局ID" align="center" prop="accountId" />
      <el-table-column label="用户ID" align="center" prop="userId" />
      <el-table-column label="机构ID" align="center" prop="parentId" />
      <el-table-column label="国知局账号" align="center" prop="account" />
      <el-table-column label="国知局密码" align="center" prop="password" />
      <el-table-column label="机构名称" align="center" prop="companyName" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="fastdfs 上传链接" align="center" prop="dfsUpUrl" />
      <el-table-column label="fastdfs 下载链接" align="center" prop="dfsDnUrl" />
      <el-table-column label="未知" align="center" prop="tag" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['manager:cpaccountExcel:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['manager:cpaccountExcel:remove']"
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

    <!-- 添加或修改cpaccountExcel对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="机构ID" prop="parentId">
          <el-input v-model="form.parentId" placeholder="请输入机构ID" />
        </el-form-item>
        <el-form-item label="国知局账号" prop="account">
          <el-input v-model="form.account" placeholder="请输入国知局账号" />
        </el-form-item>
        <el-form-item label="国知局密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入国知局密码" />
        </el-form-item>
        <el-form-item label="机构名称" prop="companyName">
          <el-input v-model="form.companyName" placeholder="请输入机构名称" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="fastdfs 上传链接" prop="dfsUpUrl">
          <el-input v-model="form.dfsUpUrl" placeholder="请输入fastdfs 上传链接" />
        </el-form-item>
        <el-form-item label="fastdfs 下载链接" prop="dfsDnUrl">
          <el-input v-model="form.dfsDnUrl" placeholder="请输入fastdfs 下载链接" />
        </el-form-item>
        <el-form-item label="未知" prop="tag">
          <el-input v-model="form.tag" placeholder="请输入未知" />
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
import { listCpaccountExcel, getCpaccountExcel, delCpaccountExcel, addCpaccountExcel, updateCpaccountExcel, exportCpaccountExcel } from "@/api/manager/cpaccountExcel";

export default {
  name: "CpaccountExcel",
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
      // cpaccountExcel表格数据
      cpaccountExcelList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        parentId: null,
        account: null,
        password: null,
        companyName: null,
        dfsUpUrl: null,
        dfsDnUrl: null,
        tag: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询cpaccountExcel列表 */
    getList() {
      this.loading = true;
      listCpaccountExcel(this.queryParams).then(response => {
        this.cpaccountExcelList = response.rows;
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
        accountId: null,
        userId: null,
        parentId: null,
        account: null,
        password: null,
        companyName: null,
        remark: null,
        dfsUpUrl: null,
        dfsDnUrl: null,
        tag: null,
        updateTime: null
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
      this.ids = selection.map(item => item.accountId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加cpaccountExcel";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const accountId = row.accountId || this.ids
      getCpaccountExcel(accountId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改cpaccountExcel";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.accountId != null) {
            updateCpaccountExcel(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCpaccountExcel(this.form).then(response => {
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
      const accountIds = row.accountId || this.ids;
      this.$confirm('是否确认删除cpaccountExcel编号为"' + accountIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delCpaccountExcel(accountIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有cpaccountExcel数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportCpaccountExcel(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>

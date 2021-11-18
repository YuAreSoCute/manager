<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="键ID" prop="keyId">
        <el-input
          v-model="queryParams.keyId"
          placeholder="请输入键ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="代理机构ID" prop="parentId">
        <el-input
          v-model="queryParams.parentId"
          placeholder="请输入代理机构ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="专利申请号" prop="applyId">
        <el-input
          v-model="queryParams.applyId"
          placeholder="请输入专利申请号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="专利名称" prop="applyName">
        <el-input
          v-model="queryParams.applyName"
          placeholder="请输入专利名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="发文类型" prop="dispatchType">
        <el-select v-model="queryParams.dispatchType" placeholder="请选择发文类型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="发文号" prop="dispatchNumber">
        <el-input
          v-model="queryParams.dispatchNumber"
          placeholder="请输入发文号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="内部编号" prop="insideNumber">
        <el-input
          v-model="queryParams.insideNumber"
          placeholder="请输入内部编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="发文状态" prop="state">
        <el-input
          v-model="queryParams.state"
          placeholder="请输入发文状态"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否移入回收站(1:代表移入，0代表未被移入)
" prop="isDel">
        <el-input
          v-model="queryParams.isDel"
          placeholder="请输入是否移入回收站(1:代表移入，0代表未被移入)
"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="签名文件标识( 1签名 2 待更新 3 已更新 4 更新失败)" prop="dispatchTag">
        <el-input
          v-model="queryParams.dispatchTag"
          placeholder="请输入签名文件标识( 1签名 2 待更新 3 已更新 4 更新失败)"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="短链接" prop="shortUrl">
        <el-input
          v-model="queryParams.shortUrl"
          placeholder="请输入短链接"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="发文日期" prop="dispatchDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.dispatchDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择发文日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="截止日期" prop="endDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.endDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择截止日期">
        </el-date-picker>
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
          v-hasPermi="['manager:dispatch:add']"
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
          v-hasPermi="['manager:dispatch:edit']"
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
          v-hasPermi="['manager:dispatch:remove']"
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
          v-hasPermi="['manager:dispatch:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="dispatchList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="发文信息ID" align="center" prop="dispatchInfoId" />
      <el-table-column label="键ID" align="center" prop="keyId" />
      <el-table-column label="代理机构ID" align="center" prop="parentId" />
      <el-table-column label="专利申请号" align="center" prop="applyId" />
      <el-table-column label="专利名称" align="center" prop="applyName" />
      <el-table-column label="发文类型" align="center" prop="dispatchType" />
      <el-table-column label="发文号" align="center" prop="dispatchNumber" />
      <el-table-column label="内部编号" align="center" prop="insideNumber" />
      <el-table-column label="发文状态" align="center" prop="state" />
      <el-table-column label="是否移入回收站(1:代表移入，0代表未被移入)
" align="center" prop="isDel" />
      <el-table-column label="签名文件标识( 1签名 2 待更新 3 已更新 4 更新失败)" align="center" prop="dispatchTag" />
      <el-table-column label="短链接" align="center" prop="shortUrl" />
      <el-table-column label="长链接" align="center" prop="longUrl" />
      <el-table-column label="描述" align="center" prop="remark" />
      <el-table-column label="发文日期" align="center" prop="dispatchDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.dispatchDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="截止日期" align="center" prop="endDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['manager:dispatch:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['manager:dispatch:remove']"
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

    <!-- 添加或修改dispatch对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="键ID" prop="keyId">
          <el-input v-model="form.keyId" placeholder="请输入键ID" />
        </el-form-item>
        <el-form-item label="代理机构ID" prop="parentId">
          <el-input v-model="form.parentId" placeholder="请输入代理机构ID" />
        </el-form-item>
        <el-form-item label="专利申请号" prop="applyId">
          <el-input v-model="form.applyId" placeholder="请输入专利申请号" />
        </el-form-item>
        <el-form-item label="专利名称" prop="applyName">
          <el-input v-model="form.applyName" placeholder="请输入专利名称" />
        </el-form-item>
        <el-form-item label="发文类型" prop="dispatchType">
          <el-select v-model="form.dispatchType" placeholder="请选择发文类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="发文号" prop="dispatchNumber">
          <el-input v-model="form.dispatchNumber" placeholder="请输入发文号" />
        </el-form-item>
        <el-form-item label="内部编号" prop="insideNumber">
          <el-input v-model="form.insideNumber" placeholder="请输入内部编号" />
        </el-form-item>
        <el-form-item label="发文状态" prop="state">
          <el-input v-model="form.state" placeholder="请输入发文状态" />
        </el-form-item>
        <el-form-item label="是否移入回收站(1:代表移入，0代表未被移入)
" prop="isDel">
          <el-input v-model="form.isDel" placeholder="请输入是否移入回收站(1:代表移入，0代表未被移入)
" />
        </el-form-item>
        <el-form-item label="签名文件标识( 1签名 2 待更新 3 已更新 4 更新失败)" prop="dispatchTag">
          <el-input v-model="form.dispatchTag" placeholder="请输入签名文件标识( 1签名 2 待更新 3 已更新 4 更新失败)" />
        </el-form-item>
        <el-form-item label="短链接" prop="shortUrl">
          <el-input v-model="form.shortUrl" placeholder="请输入短链接" />
        </el-form-item>
        <el-form-item label="长链接" prop="longUrl">
          <el-input v-model="form.longUrl" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="描述" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入描述" />
        </el-form-item>
        <el-form-item label="发文日期" prop="dispatchDate">
          <el-date-picker clearable size="small"
            v-model="form.dispatchDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择发文日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="截止日期" prop="endDate">
          <el-date-picker clearable size="small"
            v-model="form.endDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择截止日期">
          </el-date-picker>
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
import { listDispatch, getDispatch, delDispatch, addDispatch, updateDispatch, exportDispatch } from "@/api/manager/dispatch";

export default {
  name: "Dispatch",
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
      // dispatch表格数据
      dispatchList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        keyId: null,
        parentId: null,
        applyId: null,
        applyName: null,
        dispatchType: null,
        dispatchNumber: null,
        insideNumber: null,
        state: null,
        isDel: null,
        dispatchTag: null,
        shortUrl: null,
        longUrl: null,
        dispatchDate: null,
        endDate: null,
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
    /** 查询dispatch列表 */
    getList() {
      this.loading = true;
      listDispatch(this.queryParams).then(response => {
        this.dispatchList = response.rows;
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
        dispatchInfoId: null,
        keyId: null,
        parentId: null,
        applyId: null,
        applyName: null,
        dispatchType: null,
        dispatchNumber: null,
        insideNumber: null,
        state: null,
        isDel: null,
        dispatchTag: null,
        shortUrl: null,
        longUrl: null,
        remark: null,
        dispatchDate: null,
        endDate: null,
        createTime: null,
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
      this.ids = selection.map(item => item.dispatchInfoId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加dispatch";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const dispatchInfoId = row.dispatchInfoId || this.ids
      getDispatch(dispatchInfoId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改dispatch";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.dispatchInfoId != null) {
            updateDispatch(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addDispatch(this.form).then(response => {
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
      const dispatchInfoIds = row.dispatchInfoId || this.ids;
      this.$confirm('是否确认删除dispatch编号为"' + dispatchInfoIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delDispatch(dispatchInfoIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有dispatch数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportDispatch(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>
